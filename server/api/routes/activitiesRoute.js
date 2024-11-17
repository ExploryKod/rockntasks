const router = require('express').Router();
const activitiesModel = require('../../models/activitiesModel/activities.model');

router.get('/', async (req, res) => {
    try {
        const allTasks = await activitiesModel.getAllActivities('mysql');
        res.set('Access-Control-Allow-Origin', '*');
        res.send(allTasks);
    } catch (error) {
        console.error('Error retrieving food categories:', error);
        res.status(500).send({ error: 'Internal server error in food categories' });
    }
});

module.exports = router;