import api from '../utils/axios';
import type { Task } from '../utils/types';

export const useSubmitTask = () => {
  const submitTask = (submittedTask: Task, addToTaskArr: Function) => {
    api.post<Task>(`/insert-task`, submittedTask)
      .then((response) => {
        // Function that will add the new task to the tasks array
        addToTaskArr(submittedTask);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return { submitTask };
};

/**
   * Mission two: Insert a task into the database.
   * 
   * Write and return a function here which will submit
   * a JSON object to the server to be inserted into the
   * database. Make sure that the response
   * from the server is then placed into the tasks list.
   * 
   * Definition of done:
   * [x] the function sends a post request to the server
   * [x] the server inserts the task into the database
   * [x] the newly inserted task is placed into the tasks list
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
