import axios from "axios";
// import { redirectToLogin } from "../src/api/axois.jsx";

const baseURL = import.meta.env.VITE_API_ENDPOINT ?? "/api";

const api = axios.create({
  baseURL
});

// ================================
//  REQUEST INTERCEPTOR FOR JWT
// ================================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ================================
//  RESPONSE INTERCEPTOR
// ================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error?.config?.url;
    const status = error?.response?.status;

    // 🔥 IMPORTANT:
    // Do NOT force logout for login endpoint (or public endpoints)
    const ignore401For = [
      "Auth/Login",
      "Auth/Register",
      "auth/login",
      "auth/register",
      "/login",
      "User/signup",
      "User/login" // assuming login endpoint
    ];

    if (ignore401For.some((path) => url?.includes(path))) {
      return Promise.reject(error);
    }

    // 🔥 True unauthorized → logout
    if (status === 401) {
      localStorage.removeItem("token");
      // redirectToLogin(); // commented out since not defined
    }

    return Promise.reject(error);
  }
);

export default api;
