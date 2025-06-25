import axios from "axios";

// Use runtime-based detection instead of import.meta.env
const isLocalhost = window.location.hostname === "localhost";

const BASE_URL = isLocalhost ? "http://localhost:3000/api" : "https://student-record-manager-quxq.onrender.com/api"; // In production, this is correct because your backend serves from /api

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
