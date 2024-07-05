import axios from 'axios';
import CONTANTS from '../constants';

const instance = axios.create({
  baseURL: `${CONTANTS.BASE_URL}api/`,
});

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
    //TODO rewrite for the better if you know how
    if (err.response.status === 408) {
      window.localStorage.removeItem(CONTANTS.ACCESS_TOKEN);

      if (
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/registration' &&
        window.location.pathname !== '/'
      ) {
        window.location.pathname = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
