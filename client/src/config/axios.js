import axios from "axios";
import { API_BASE_URL } from "../constants";

// Create axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Only log if it's not the /me endpoint (checking auth status)
      const isCheckingAuth = error.config?.url?.includes("/api/users/me");
      if (!isCheckingAuth) {
        console.error("Unauthorized access");
      }
      // Silently handle 401 on auth check
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
