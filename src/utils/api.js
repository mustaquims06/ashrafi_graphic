// src/utils/api.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://ashrafigraphic.com/api";

const api = axios.create({
  baseURL: API_URL,
  // You can set default timeout if you want: timeout: 10000
});

// Request interceptor: attach token if present
api.interceptors.request.use(
  (config) => {
    try {
      const cur = JSON.parse(localStorage.getItem("currentUser"));
      const token = cur?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      // ignore JSON parse errors
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
