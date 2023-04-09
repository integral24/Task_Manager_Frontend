import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITask } from '../../types/TasksTypes';

interface ITaskState {
  tasks: ITask[];
}

const initialState: ITaskState = {
  tasks: [
    {
      idTask: 1,
      titleTask: 'titleTask',
      textTask: 'textTask',
      statusTask: 'done',
    },
  ],
};

const taskSlice = createSlice({
  name: 'taskSlice',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<ITask>) {},
  },
});

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;
