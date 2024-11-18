const router = require('express').Router();
const taskModel = require('../../models/tasksModel/tasks.model');
$database = process.env.DATABASE_SERVICE || 'mysql';
console.info("database: " + $database)
router.get('/', async (req, res) => {
  try {
    const alltasks = await taskModel.getAllTasks($database);
    res.set('Access-Control-Allow-Origin', '*');
    res.send(alltasks);
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

router.get('/:activity', async (req, res) => {
  try {
    const activity = req.params.activity; // Retrieve the category from the URL parameter
    const TaskByActivity = await taskModel.getTasksByActivity(activity);
    res.send(TaskByActivity);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const taskData = req.body;
    console.log('task is under way ', taskData)
    const insertedTask = await taskModel.insertTask(taskData);
    res.send(insertedTask);
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

module.exports = router;








