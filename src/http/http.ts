import axios from 'axios';

const http = axios.create({
  baseURL: '',
  timeout: 2000,
});

export default http;
