import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://pre-onboarding-selection-task.shop',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

customAxios.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'access_token'
    )}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default customAxios;
