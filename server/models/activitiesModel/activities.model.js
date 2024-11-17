const { ConnectionFactory } = require(`../factories/mysql/connectbdd`);
const { sql } = require(`../factories/neon/connectbdd`);


const connectionFactory = new ConnectionFactory();

async function getAllTaskActivitiesMySQL() {
    const connection = await connectionFactory.createConnection();
    console.log('Database connection successful to get all food activities!');
    const [dbRows, dbFields] = await connection.execute('SELECT * FROM activities');
    connection.end();

    return dbRows;
}


async function getAllTaskActivitiesNeon() {
    console.log('Neon connection successful to get all food activities')
    const dbRows = sql`
        select 
        * 
        from task_activities`
    
    return dbRows
 }

async function getAllActivities() {

    switch (process.env.DATABASE_SERVICE) {
        case 'mysql':
            return await getAllTaskActivitiesMySQL();
        case 'mongodb':
            return 'mongodb is not avaible to query food activities yet';
        case 'neon':
            return await getAllTaskActivitiesNeon();
        default:
            throw new Error(`Unsupported database service:`);
    }
}

module.exports = {
    getAllActivities,
};

