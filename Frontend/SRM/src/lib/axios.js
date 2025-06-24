import axios from "axios";

//in production, there is no localhost, so we have to make it dynamic
const isLocalhost = window.location.hostname === "localhost";

const BASE_URL = isLocalhost
  ? "http://localhost:3000/api"
  : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;

