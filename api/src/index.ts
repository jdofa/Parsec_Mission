import Hapi from '@hapi/hapi';
import { makeDb, startDatabase } from './database';
import dotenv from 'dotenv';

const init = async () => {
  dotenv.config();
  const db = makeDb();

  const server = Hapi.server({
    port: 4000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/tasks',
    handler: async (r, h) => {
      try {
        // Had to order because the update query re-orders the tasks
        const { rows } = await db.raw('select * from tasks ORDER BY tasks_id ASC'); 
        return h.response(rows).code(200)
      } catch (error) {
        console.error(error);
        return h.response().code(500)        
      }
    } 
  });

  server.route({
    method: 'PUT',
    path: '/update-task', 
    handler: async (r, h) => {
      try {
        const newTask = JSON.parse(JSON.stringify(r.payload));
        const task = await db.raw('UPDATE tasks SET is_complete = (?) WHERE tasks_id = (?)', [newTask.is_complete, newTask.tasks_id]);
        return h.response(task).code(204);
      } 
      catch (error) {
        console.error(error);
        return h.response().code(500)        
      }
    } 
  });

  server.route({
    method: 'POST',
    path: '/insert-task', // Bonus points if you give it a sensical name ;)
    handler: async (r, h) => {
      try{
        // Deep clone the object to avoid mutating the original
        // Can use Lodash instead to deep clone and not lose data, if dealing with functions, symbols, or undefined values
        const newTask = JSON.parse(JSON.stringify(r.payload));
        const task = await db('tasks').insert({content: newTask.content});
        return h.response(task).code(201);
      } catch (error) {
        console.error(error);
        return h.response().code(500)        
      }
    } 
  });

  /**
       * Mission Two: Insert a task into the database.
       * 
       * Receive a post request from the front end
       * and insert it into the database.details, too
       * 
       * Definition of done:
       * [x] the record is inserted into the database
       * [x] a success response is returned
       * 
       * Your submission will be judged out of 10 points based on
       * the following criteria:
       * 
       * - Works as expected - 5 points
       * - Code quality - 5 points
       *   - Is the code clean and easy to read?
       *   - Are there any obvious bugs?
       *   - Are there any obvious performance issues?
       *   - Are there comments where necessary?
       */

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
startDatabase();
