import http from '../../../http/http';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface IUserData {
  name: string;
  email: string;
  pass: string;
}

export const signUp = createAsyncThunk(
  'auth/signup',
  async (user: IUserData) => {
    const { data } = await http.post('/auth/signup', user);
    return data;
  }
);

export const signIn = createAsyncThunk('auth/signin', async (user) => {
  const { data } = await http.post('/auth/signin', user);
  return data;
});

export const signOut = createAsyncThunk('auth/signout', async (user) => {
  const { data } = await http.post('/auth/signout', user);
  return data;
});
