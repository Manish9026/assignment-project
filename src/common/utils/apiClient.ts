import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ROUTES } from './constants';

/**
 * Centralized API client using Axios
 * Base URL: DummyJSON API
 * Features:
 * - Automatic auth token attachment
 * - Centralized error handling
 * - Request/response interceptors
 */

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach auth token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      if (status === 401) {
        // Unauthorized - clear auth and redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = ROUTES.LOGIN;
      }
      
      console.error('API Error:', status, data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
    } else {
      // Other errors
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;

