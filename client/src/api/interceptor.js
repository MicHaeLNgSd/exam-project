import axios from 'axios';
import CONTANTS from '../constants';

const AUTH_PATHS = ['/login', '/registration', '/'];

const instance = axios.create({ baseURL: `${CONTANTS.BASE_URL}api/` });

instance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem(CONTANTS.ACCESS_TOKEN);
    if (token) {
      config.headers = { ...config.headers, Authorization: token };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      window.localStorage.setItem(CONTANTS.ACCESS_TOKEN, response.data.token);
    }
    return response;
  },
  (err) => {
    if (err.response.status === 408) {
      window.localStorage.removeItem(CONTANTS.ACCESS_TOKEN);

      if (!AUTH_PATHS.includes(window.location.pathname)) {
        window.location.pathname = '/login';
      } else {
        window.history.go();
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
