import {
	createTask,
	getTask,
	getTasks,
} from '../../redux/slices/actions/actionsTasks';
import taskSlice, { Status, initialState } from '../../redux/slices/taskSlice';

import { store } from '@/redux/store';

import { ITask } from '@/types/TasksTypes';

const task: ITask = {
	title: 'title task',
	done: false,
	id: 0,
	description: '',
	createDate: '',
	type: 'Срочные',
};

describe('actions test', () => {
	it('task actions tests', () => {
		const state = taskSlice(initialState, getTasks.pending);
		expect(state.status).toBe(Status.LOADING);
	});
});

describe('store test', () => {
	it('tasks state empty atate', () => {
		const tasks = store.getState().taskSlice.tasks;
		expect(tasks).toMatchObject([]);
	});

	it('get tasks from store', () => {
		const state = taskSlice(
			initialState,
			createTask.fulfilled([task], '', task)
		);
		expect(state.tasks).toMatchObject([task]);
	});
});
