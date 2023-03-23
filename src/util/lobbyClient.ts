import axios from "axios";
import { store } from "../redux/store";

const lobbyClient = axios.create({
  baseURL: "http://localhost:4798/",
  withCredentials: true, // This is important for sending and receiving cookies
});

lobbyClient.interceptors.request.use(
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

export default lobbyClient;
