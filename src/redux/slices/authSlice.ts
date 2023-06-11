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
        setToken(action.payload.successToken);
        const { id, name, email } = action.payload.user;
        state.user.id = id;
        state.user.name = name;
        state.user.email = email;
      } else {
        state.status = Status.ERROR;
      }
      // if и эррор и мессадж
      // console.log(action.payload);
      // state.status = Status.SUCCESS;
    });
    builder.addCase(api.signUp.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

// export const {  } = authSlice.actions;
export default authSlice.reducer;
