import { createSlice } from '@reduxjs/toolkit';
import { ITask } from '../../types/TasksTypes';
import * as api from './actionsTasks';

interface IState {
  tasks: ITask[];
}

const initialState: IState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'taskSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create task
    // Get tasks
    builder.addCase(api.getTasks.pending, (state) => {
      state.tasks = [];
    });
    builder.addCase(api.getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(api.getTasks.rejected, (state) => {
      state.tasks = [];
    });
    // Get task
    // Update task
    // Delete task
  },
});

// export const {  } = taskSlice.actions;
export default taskSlice.reducer;
