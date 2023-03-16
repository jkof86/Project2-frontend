import axios from "axios";
import { store } from "../redux/store";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // This is important for sending and receiving cookies
});

apiClient.interceptors.request.use(
  (config) => {
    const csrfToken = store.getState().csrf.token;
    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
