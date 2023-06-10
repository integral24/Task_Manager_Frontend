import axios from 'axios';
import { getToken } from './tokenService';

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {
    // Authorization: getToken() || '',
    common: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
  },
  withCredentials: true,
});

export default http;
