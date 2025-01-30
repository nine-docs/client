import axios, { Axios } from "axios";
import { getAuthStore } from "stores/authStore";

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

      config.headers = config.headers || {}; // headers가 undefined일 수 있으므로 초기화

      if (token) {
        (config.headers as any).set("Authentication", `${token}`);
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
    const data = JSON.parse(response.data);

    if (!!data?.status && data?.status === 401) {
      getAuthStore().deleteAuthInfo();
      window.location.href = "/login"; // ✅ 로그인 페이지로 이동
    }
    if (!!data?.status && data?.status !== 200) {
      return Promise.reject("에러");
    }

    return data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default http;
