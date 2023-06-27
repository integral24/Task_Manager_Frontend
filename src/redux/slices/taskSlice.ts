import { ITask } from '../../types/TasksTypes';
import { createSlice } from '@reduxjs/toolkit';

import { Status } from '@/types/commonTypes';

import * as api from './actions/actionsTasks';

interface IState {
	tasks: ITask[];
	oneTask: ITask | Record<string, never>;
	status: Status;
}

const initialState: IState = {
	tasks: [],
	oneTask: {},
	status: Status.loading,
};

const taskSlice = createSlice({
	name: 'taskSlice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(api.createTask.pending, (state) => {
			state.status = Status.loading;
		});
		builder.addCase(api.createTask.fulfilled, (state, action) => {
			if ('id' in action.payload[0]) {
				state.status = Status.success;
				state.tasks.push(action.payload[0]);
			} else state.status = Status.error;
		});
		builder.addCase(api.createTask.rejected, (state) => {
			state.status = Status.error;
		});

		builder.addCase(api.getTasks.pending, (state) => {
			state.status = Status.loading;
			state.tasks = [];
		});
		builder.addCase(api.getTasks.fulfilled, (state, action) => {
			state.status = Status.success;
			state.tasks = action.payload;
		});
		builder.addCase(api.getTasks.rejected, (state) => {
			state.status = Status.error;
			state.tasks = [];
		});

		builder.addCase(api.getTask.pending, (state) => {
			state.status = Status.loading;
			state.oneTask = {};
		});
		builder.addCase(api.getTask.fulfilled, (state, action) => {
			state.status = Status.success;
			state.oneTask = action.payload[0];
		});
		builder.addCase(api.getTask.rejected, (state) => {
			state.status = Status.error;
			state.oneTask = {};
		});

		builder.addCase(api.updateTask.pending, (state) => {
			state.status = Status.loading;
		});
		builder.addCase(api.updateTask.fulfilled, (state, action) => {
			if (action.payload[0]) {
				if ('id' in action.payload[0]) {
					state.status = Status.success;
					state.tasks.map((el, idx) => {
						if (el.id === action.payload[0].id) {
							state.tasks[idx] = action.payload[0];
						}
					});
				} else state.status = Status.error;
			} else state.status = Status.error;
		});
		builder.addCase(api.updateTask.rejected, (state) => {
			state.status = Status.error;
		});

		builder.addCase(api.deleteTask.pending, (state) => {
			state.status = Status.loading;
		});
		builder.addCase(api.deleteTask.fulfilled, (state, action) => {
			if (action.payload.delete) {
				state.status = Status.success;
				if (state.tasks.length > 0) {
					const newTasksList = state.tasks.find(
						(el) => el.id !== action.payload.id
					);
					state.tasks = newTasksList ? [newTasksList] : [];
				}
			} else state.status = Status.error;
		});
		builder.addCase(api.deleteTask.rejected, (state) => {
			state.status = Status.error;
		});
	},
});

// export const {  } = taskSlice.actions;
export default taskSlice.reducer;
