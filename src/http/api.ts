import http from './http';
import { ITask } from '../types/TasksTypes';

export const apiTasks = {
  async getTasks() {
    try {
      const res = await http.get('/tasks');
      return res.data as ITask[];
    } catch (err) {
      console.log(err);
    }
  },

  async addTasks(task: ITask) {
    try {
      const res = await http.post('/addTask', {
        task,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
};
