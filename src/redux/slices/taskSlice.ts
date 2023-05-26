import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { apiTasks } from '@/http/api';
import { ITask } from '../../types/TasksTypes';

interface ITaskState {
  tasks: ITask[];
}

const initialState: ITaskState = {
  tasks: [
    {
      id: 1,
      title: 'titleTask',
      text: 'textTask',
      type: 'Тривиальные',
      status: 'done',
    },
  ],
};

const taskSlice = createSlice({
  name: 'taskSlice',
  initialState,
  reducers: {
    addTask(state: ITaskState, action: PayloadAction<ITask>) {
      console.log(state, action);
    },
  },
});

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;
