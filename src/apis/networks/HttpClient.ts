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
    const token = useAuthStore((state) => state.token);

    if (token !== "") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const deleteAuthInfo = useAuthStore((state) => state.deleteAuthInfo);

    if (error.response?.status === 401) {
      // 강제 로그아웃
      deleteAuthInfo();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default http;
