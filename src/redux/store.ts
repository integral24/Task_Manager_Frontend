import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import taskSlice from './slices/taskSlice';

export const store = configureStore({
	reducer: {
		authSlice,
		taskSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
