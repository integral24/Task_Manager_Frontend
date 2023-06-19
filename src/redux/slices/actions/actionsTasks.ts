import { createAsyncThunk } from '@reduxjs/toolkit';

import http from '@/http/http';

import { ITask, ITaskCreate } from '@/types/TasksTypes';

export const createTask = createAsyncThunk(
	'task/createTask',
	async (task: ITaskCreate): Promise<ITask[]> => {
		const { data } = await http.post('/task', task);
		return data;
	}
);

export const getTasks = createAsyncThunk(
	'task/getTasks',
	async (): Promise<ITask[]> => {
		console.log('get tasks');
		const res = await http.get(`/task/`);
		console.log(res);
		return Array.isArray(res.data) ? res.data : [];
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
