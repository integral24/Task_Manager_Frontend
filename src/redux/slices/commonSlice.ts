import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Status } from '@/types/commonTypes';

export type TStatus =
	| Status.error
	| Status.loading
	| Status.pending
	| Status.success;

interface IState {
	status: TStatus;
	message: string | null;
}

const initialState: IState = {
	status: Status.pending,
	message: null,
};

const commonSlice = createSlice({
	name: 'commonSlice',
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<TStatus>) => {
			state.status = action.payload;
		},
	},
});

// export const {  } = authSlice.actions;
export default commonSlice;
