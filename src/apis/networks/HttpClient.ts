import axios, { Axios } from "axios";
import { useAuthStore } from "stores/authStore";

const API_URL = process.env.REACT_APP_API_URL;

const http = new Axios({
  baseURL: API_URL,
  responseType: "json",
  transformRequest: axios.defaults.transformRequest,
});

http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response) => {
    return JSON.parse(response.data);
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default http;
