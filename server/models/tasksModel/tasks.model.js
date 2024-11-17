const { ConnectionFactory } = require(`../factories/mysql/connectbdd`);
const { sql } = require('../factories/neon/connectbdd');

const DATABASE_SERVICE = process.env.DATABASE_SERVICE;
const connectionFactory = new ConnectionFactory();

async function getAllTasks(DATABASE_SERVICE) {
 
  switch (DATABASE_SERVICE) {
    case 'mysql':
      const connection = await connectionFactory.createConnection();
      const [dbRows, dbFields] = await connection.execute('SELECT * FROM tasks');
      console.log('Mysql Database connection successful to get all tasks!');
      connection.end();
      return dbRows;
    case 'mongodb':
      throw new Error("MongoDB not supported yet to query tasks")
    case 'neon':
      const task = sql`
          select 
          * 
          from tasks`
      console.log('Neon connection successful to get all query for tasks')
      return task
    default:
      throw new Error(`Get all tasks - unsupported database service: ${process.env.DATABASE_SERVICE}`);
  }

}

async function getTasksByActivity(activity) {

  switch (DATABASE_SERVICE) {
    case 'mysql':
      const connection = await connectionFactory.createConnection();
      console.log('Mysql Database connection successful to get task by activity!');
      const [dbRows, dbFields] = await connection.execute('SELECT * FROM tasks WHERE task_activity = ?',[activity]);
      connection.end();
      return dbRows;
    case 'neon':
      const taskRows = await sql`
      select
        *
      from tasks
      where activity = ${ activity }
    `
      return taskRows
    default:
      throw new Error(`Get task by activity - unsupported database service: ${process.env.DATABASE_SERVICE}`);
  }

}

async function insertTask(taskData) {

  switch(DATABASE_SERVICE) {
    case 'mysql':
        const connection = await connectionFactory.createConnection();
        console.log('Mysql Database connection successful to insert task!');
        const query = 'INSERT INTO task (task_activity_id, task_activity, task_name, task_image_url, task_status) VALUES (?, ?, ?, ?, ?)';
        const values = [
          taskData.activityNameId ?? 0,
          taskData.activityName ?? null,
          taskData.image_name ?? null,
          taskData.taskImageUrl ?? null,
          taskData.taskPrice ?? null
        ];

        // Execute the query with the prepared values
        const [result] = await connection.execute(query, values);
        connection.end();

        return {
          id: result.insertId,
          ...taskData
        };
    case 'neon':
      const task = await sql`
    insert into tasks
      (task_activity_id, task_activity task_name, task_image_url, task_status)
    values
      ( ${ taskData.activityNameId ?? null }, 
        ${ taskData.activityName ?? null }, 
        ${ taskData.image_name ?? null }, 
        ${ taskData.taskImageUrl ?? null }, 
        ${ taskData.taskPrice ?? null } 
      )
    returning task_activity_id, task_activity, task_name, task_image_url, task_status`
    return task

    case 'mondoDB':
      return "MongoDB not supported yet to insert task"
    default:
      throw new Error(`Insert task - unsupported database service: ${process.env.DATABASE_SERVICE}`);
  }
}

module.exports = {
  getAllTasks,
  insertTask,
  getTasksByActivity
};
