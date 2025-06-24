import axios from "axios";

//in production, there is no localhost, so we have to make it dynamic
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "https://student-record-manager-8e81.onrender.com/api/students";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
