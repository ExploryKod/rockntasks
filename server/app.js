const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const session = require('express-session');
const path = require('path');
const bodyParser = require("body-parser");

dotenv.config({ path: '../.env'})

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
// const config = require('config');
const app = express();

const corsOptions = {
  origin: "*",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

const calculateTotalOrderAmount = (items) => {
  return items[0].amount * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateTotalOrderAmount(items),
      currency: "usd",
      description: "This is for GFG Stripe API Demo",
      automatic_payment_methods: {
          enabled: true,
      },
  });

  res.send({
      clientSecret: paymentIntent.client_secret,
  });
});

// todo: delete image from uploads while we delete column from databse (link to image path in bdd image path in uploads)
// todo: pbm avec id quand upload
const productsRoute = require('./api/routes/productsRoutes');
const foodCategoriesRoute = require('./api/routes/foodCategoriesRoute');
const tasksRoute = require('./api/routes/tasksRoutes');
const taskActivitiesRoute = require('./api/routes/activitiesRoute');
const authRoutes = require('./api/routes/authRoutes');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// const result = sass.compile("./static/style/main.scss");
// console.log(result.css);

// const compressed = sass.compile("main.scss", {style: "compressed"});
// console.log(compressed.css);

// configuration pour le traitement du corps de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// charger les valeurs de configuration
// const port = config.get('server.port');
// const dbUrl = config.get('database.url');

//onst port = process.env.NODE_ENV === 'dockerdev' ? 5000 : 4000;
const port = process.env.PORT || 4000;
app.set('view engine', 'ejs');
app.use('/auth', authRoutes);

app.get('/welcome', (req, res) => {
    res.send(`
      <html>
        <head>
          <title>Welcome page</title>
        </head>
        <body>
          <h1>Welcome dev</h1>
       
        </body>
      </html>
    `);
});

app.get("/", (req, res) => {
  res.render("index")
})

app.get("/login", (req, res) => {
  const toggle = false;
  res.render("login", { toggle })
})

app.get("/register", (req, res) => {
  res.render("register")
})

// Render the EJS template
app.get('/connexion', (req, res) => {
  const toggle = false; // Set the initial value of toggle

  // Render the EJS template with the toggle value
  res.render('connexion', { toggle });
});
app.use('/category_food', foodCategoriesRoute);
app.use('/products', productsRoute);
app.use('/activity', taskActivitiesRoute);
app.use('/tasks', tasksRoute);

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err.message });
  }
});

// démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});



