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
    if (!!localStorage.getItem("authStore")) {
      const authStore = JSON.parse(localStorage.getItem("authStore")!); // 로컬 스토리지에서 데이터 가져오기

      const token = authStore.state.token;
      const accessTokenExpiredAt = authStore.state.accessTokenExpiredAt;

      if (token) {
        // AxiosHeaders 객체의 set 메서드를 사용
        config.headers = config.headers || {}; // headers가 undefined일 수 있으므로 초기화
        (config.headers as any).set("Authorization", `Bearer ${token}`);
      }
    }

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
