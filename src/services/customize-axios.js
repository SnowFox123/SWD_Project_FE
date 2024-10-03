import axios from "axios";
import { store } from '../redux/store'; // Correct way to import named exports

const BASE_URL = 'https://localhost:7221';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const appState = store.getState(); // Get state from the store
    const accessToken = appState?.auth?.accessToken; // Access the token from state
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
