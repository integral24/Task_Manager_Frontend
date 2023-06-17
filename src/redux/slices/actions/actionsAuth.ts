import {
  IUserDataSignin,
  IUserDataSignup,
  IResponseSign,
} from '@/types/authTypes';
import http from '../../../http/http';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const signUp = createAsyncThunk(
  'auth/signup',
  async (user: IUserDataSignup) => {
    const { data } = await http.post('/auth/signup', user);
    return data as IUserDataSignup;
  }
);

export const signIn = createAsyncThunk(
  'auth/signin',
  async (user: IUserDataSignin) => {
    const { data } = await http.post('/auth/signin', user);
    return data as IResponseSign;
  }
);

export const signOut = createAsyncThunk('auth/signout', async (user) => {
  const { data } = await http.post('/auth/signout', user);
  return data;
});
