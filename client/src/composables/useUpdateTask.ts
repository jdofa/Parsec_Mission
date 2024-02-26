import api from '../utils/axios';
import type { Task } from '../utils/types';

export const useUpdateTask = () => {
  const updateTask = (submittedTask: Task, updateTask: Function) => {
    api.put<Task>(`/update-task`, submittedTask)
      .then((response) => {
        if(response.status === 204){
          // Function that will update the task in the tasks array
          updateTask(submittedTask);
        }
        else{
          console.error('Task not updated to database.', response.status, response.statusText);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return { updateTask };
};



  