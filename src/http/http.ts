import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3002/api',
  timeout: 5000,
});
console.log(process.env.REACT_APP_BASE_URL, 'url');

export default http;
