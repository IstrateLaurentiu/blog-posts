import axios, { AxiosError } from 'axios';
// import { isTokenExpired } from "../utils";

const httpInstance = axios.create({ baseURL: 'http://localhost:3001' });

httpInstance.interceptors.request.use((config) => {
  const localStorageToken = window.localStorage.getItem('token') || '';

  if (typeof config.headers!['Authorization'] === 'undefined') {
    config.headers!['Authorization'] = localStorageToken;
  }

  return config;
});

export const http = httpInstance;
