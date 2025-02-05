import axios from 'axios';

const API = axios.create({
  baseURL: 'https://food-web-a0je.onrender.com/api/',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('adminTokenOrder');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
