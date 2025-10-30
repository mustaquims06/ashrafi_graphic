// src/api/client.js
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "https://ashrafigraphic.com";
const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = currentUser?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;