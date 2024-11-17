const router = require('express').Router();
const { ConnectionFactory } = require(`../../models/factories/mysql/connectbdd`);
const jwt = require('jsonwebtoken');
require('dotenv').config();

const connectionFactory = new ConnectionFactory();

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Route de connexion
router.post('/logged', async (request, response) => {
  try {
    const connection = await connectionFactory.createConnection();
    console.log('Login connexion database successful!');
    let username = request.body.username;
    let password = request.body.password;
    console.log('username ' + username)
    console.log('mot de passe' + password)
    if (username && password) {
      const [dbRows, dbFields] = await connection.execute('SELECT * FROM user WHERE username = ? AND password = ?', [username, password]);
      // If the account exists
      if (dbRows.length > 0) {
        // Génération du token JWT
        const token = jwt.sign(
          { id: dbRows[0].id, username: dbRows[0].username, role: dbRows[0].role },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        response.status(200).json({ 
          success: true,
          message: 'Vous êtes bien celui que vous prétendez être', 
          token: token,
          redirectUrl: '/' // URL de redirection
        });
      } else {
        response.send({ message: 'Mot de passe ou pseudo incorrecte' });
      }
      connection.end();
    } else {
      response.send('Il y a eu un probleme avec le mot de passe ou l\' username');
    }
  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Route d'enregistrement
router.post('/register', async (req, res) => {
  try {
    const connection = await connectionFactory.createConnection();
    console.log('Register connexion database successful!');
    const { username, email, password, status } = req.body;
    console.log(req.body)
    // Vérifier si l'utilisateur existe déjà
    const [existingUserRows, existingUserFields] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);
    if (existingUserRows.length > 0) {
      connection.end();
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Créer un nouvel utilisateur
    const [result, _] = await connection.execute('INSERT INTO user (username, email, password, status) VALUES (?, ?, ?, ?)', [username, email, password, status]);
    const newUserId = result.insertId;

    // Générer un token JWT
    const token = jwt.sign(
      { id: newUserId, email: email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    connection.end();
    res.status(201).json({message: "Vous êtes bien enregistré", token: token });

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'enregistrement' });
  }
});


router.get('/home', authenticateToken, async (request, response) => {
  // L'utilisateur est connecté
  const [user, _] = await connection.execute('SELECT * FROM user WHERE id = ?', [request.user.id]);
  response.render('home', { username: user[0].username });
});

module.exports = router;