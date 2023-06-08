import http from '../../../http/http';
import { ITask } from '../../../types/TasksTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createTask = createAsyncThunk(
  'task/createTask',
  async (task: ITask): Promise<ITask[]> => {
    const { data } = await http.post('/task', task);
    return data;
  }
);

export const getTasks = createAsyncThunk(
  'task/getTasks',
  async (): Promise<ITask[]> => {
    const { data } = await http.get(`/task`);
    return data;
  }
);

export const getTask = createAsyncThunk(
  'task/getTask',
  async (id: number): Promise<ITask[]> => {
    const { data } = await http.get(`/task/${id}`);
    return data;
  }
);

export const updateTask = createAsyncThunk(
  'task/updateTask',
  async (task: ITask): Promise<ITask[]> => {
    const { data } = await http.put('/task', task);
    return data;
  }
);

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (id: number): Promise<{ id: number; delete: boolean }> => {
    const { data } = await http.delete(`/task/${id}`);
    return data;
  }
);
