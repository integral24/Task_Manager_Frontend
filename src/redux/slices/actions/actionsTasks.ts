import { store } from '../../store';
import { createAsyncThunk } from '@reduxjs/toolkit';

import http from '@/http/http';

import { IResponse, ITask, ITaskCreate } from '@/types/TasksTypes';

const getState = () => store.getState().taskSlice;

export const createTask = createAsyncThunk(
	'task/createTask',
	async (task: ITaskCreate): Promise<IResponse> => {
		const { data } = await http.post('/create', {
			task,
			sort: getState().sort,
		});
		// const { data } = await http.post('/task', task);
		return data;
	}
);

export const getTasks = createAsyncThunk(
	'task/getTasks',
	async (): Promise<ITask[]> => {
		const res = await http.post(`/tasks/`);
		return Array.isArray(res.data) ? res.data : [];
	}
);

export const getTask = createAsyncThunk(
	'task/getTask',
	async (id: number): Promise<ITask[]> => {
		const { data } = await http.post(`/task/${id}`);
		return data;
	}
);

export const updateTask = createAsyncThunk(
	'task/updateTask',
	async (task: ITask): Promise<ITask[]> => {
		const { data } = await http.put('/task/' + task.id, task);
		return data;
	}
);

export const deleteTask = createAsyncThunk(
	'task/deleteTask',
	async (
		id: number
	): Promise<{ id: number; delete: boolean; message: string }> => {
		const { data } = await http.delete(`/task/${id}`);
		return data;
	}
);
