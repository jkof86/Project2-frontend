import axios from "axios";

const csrfClient = axios.create({
  baseURL: "http://localhost:4798/api",
  withCredentials: true, // This is important for sending and receiving cookies
});

export default csrfClient;
