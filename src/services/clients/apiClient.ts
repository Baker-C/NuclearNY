import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const timeout = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

const config: AxiosRequestConfig = {
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const apiClient: AxiosInstance = axios.create(config);

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token, modify headers, etc.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

