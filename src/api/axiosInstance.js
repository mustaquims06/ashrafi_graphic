// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add JWT token automatically to all requests
axiosInstance.interceptors.request.use((config) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser && currentUser.token) {
    config.headers.Authorization = `Bearer ${currentUser.token}`;
  }
  return config;
});

export default axiosInstance;
