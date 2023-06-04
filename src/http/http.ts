import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDdiYjgyZGNjMmIyMjQ5ZjRlMDBkOTQiLCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwiaWF0IjoxNjg1ODI5Njc3LCJleHAiOjE2ODU4MzIwMTd9.qCFSxGDPYlfnkkdf2t6gxTiB76zZJdvSObImC1tjPdA',
    common: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
  },
  withCredentials: true,
});
