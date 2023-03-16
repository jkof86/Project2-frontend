import axios from "axios";

const csrfClient = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // This is important for sending and receiving cookies
});

export default csrfClient;
