import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5092/api',
  // baseURL: 'http://127.0.0.1:5092/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(token);
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



export default axiosInstance;
