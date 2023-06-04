import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
});

export default http;
