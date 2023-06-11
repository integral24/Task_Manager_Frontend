import { createSlice } from '@reduxjs/toolkit';
import * as api from './actions/actionsAuth';
import { setToken } from '@/http/tokenService';

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
      if (action.payload.successToken) {
        state.status = Status.SUCCESS;
        setToken(action.payload.successToken);
        const { id, name, email } = action.payload.user;
        state.user.id = id;
        state.user.name = name;
        state.user.email = email;
        state.message = action.payload.message ?? '';
      } else {
        state.status = Status.ERROR;
        console.log(action.payload);
      }
    });
    builder.addCase(api.signUp.rejected, (state, action) => {
      state.status = Status.ERROR;
      console.log(action.payload);
    });

    builder.addCase(api.signIn.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(api.signIn.fulfilled, (state, action) => {
      if (action.payload.successToken) {
        state.status = Status.SUCCESS;
        setToken(action.payload.successToken);
        const { id, name, email } = action.payload.user;
        state.user.id = id;
        state.user.name = name;
        state.user.email = email;
        state.message = action.payload.message ?? '';
      } else {
        state.status = Status.ERROR;
        console.log(action.payload);
      }
    });
    builder.addCase(api.signIn.rejected, (state, action) => {
      state.status = Status.ERROR;
      console.log(action.payload);
    });
  },
});

// export const {  } = authSlice.actions;
export default authSlice.reducer;
