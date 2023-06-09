import { createSlice } from '@reduxjs/toolkit';

// import { RootState, store } from '@/redux/store';
import { setToken } from '@/http/tokenService';

import * as api from './actions/actionsAuth';

enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface IState {
	user: {
		id: number | null;
		name: string | null;
		email: string | null;
	};
	status: Status;
	message: string | null;
}

const initialState: IState = {
	user: {
		id: null,
		name: null,
		email: null,
	},
	status: Status.LOADING,
	message: null,
};

const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(api.signUp.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(api.signUp.fulfilled, (state, action) => {
			if (action.payload.accessToken) {
				state.status = Status.SUCCESS;
				setToken(action.payload.accessToken);
				const { id, name, email } = action.payload.user;
				state.user.id = id;
				state.user.name = name;
				state.user.email = email;
				state.message = action.payload.message ?? '';
			} else {
				state.status = Status.ERROR;
			}
		});
		builder.addCase(api.signUp.rejected, (state) => {
			state.status = Status.ERROR;
		});

		builder.addCase(api.signIn.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(api.signIn.fulfilled, (state, action) => {
			if (action.payload.accessToken) {
				state.status = Status.SUCCESS;
				setToken(action.payload.accessToken);
				const { id, name, email } = action.payload.user;
				state.user.id = id;
				state.user.name = name;
				state.user.email = email;
				state.message = action.payload.message ?? '';
			} else {
				state.status = Status.ERROR;
			}
		});
		builder.addCase(api.signIn.rejected, (state) => {
			state.status = Status.ERROR;
		});

		builder.addCase(api.getUser.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(api.getUser.fulfilled, (state, action) => {
			state.status = Status.SUCCESS;
			const { id, name, email } = action.payload.user;
			state.user.id = id;
			state.user.name = name;
			state.user.email = email;
		});
		builder.addCase(api.getUser.rejected, (state) => {
			state.status = Status.ERROR;
		});
	},
});

// export const {  } = authSlice.actions;
export default authSlice.reducer;
