import { createSlice } from '@reduxjs/toolkit';
import * as api from './actions/actionsAuth';
import { setToken } from '@/http/tokenService';

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface IState {
  successToken: string;
  user: {
    name: string;
  };
  status: Status;
}

const initialState: IState = {
  successToken: '',
  user: {
    name: '',
  },
  status: Status.LOADING,
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
      console.log(action.payload);
      setToken(action.payload?.successToken);
      state.status = Status.SUCCESS;
    });
    builder.addCase(api.signUp.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

// export const {  } = authSlice.actions;
export default authSlice.reducer;
