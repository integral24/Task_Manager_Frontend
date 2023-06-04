import http from '../../http/http';
import { ITask } from '../../types/TasksTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createTask = createAsyncThunk(
  'task/createTasks',
  async (task: ITask): Promise<ITask> => {
    const res = await http.post('/task', task);
    return res.data;
  }
);

export const getTasks = createAsyncThunk(
  'task/getTasks',
  async (): Promise<ITask[]> => {
    const res = await http.get(`/tasks/`);
    return res.data;
  }
);

export const getTask = createAsyncThunk(
  'task/getTask',
  async (id: number): Promise<ITask> => {
    const res = await http.get(`/task/one/${id}`);
    return res.data;
  }
);

export const updateTask = createAsyncThunk(
  'task/updateTask',
  async (task: ITask): Promise<ITask> => {
    const res = await http.put('/task', task);
    return res.data;
  }
);

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (id: number): Promise<{ id: number; delete: boolean }> => {
    const res = await http.delete(`/task/${id}`);
    return res.data;
  }
);
