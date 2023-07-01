import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import commonSlice from './slices/commonSlice';
import taskSlice from './slices/taskSlice';

export const store = configureStore({
	reducer: {
		authSlice,
		taskSlice,
		commonSlice: commonSlice.reducer,
	},
	devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
