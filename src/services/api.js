import axios from "axios";

const baseURL = import.meta.env.VITE_API_ENDPOINT ?? "/api";

// Shared axios client for frontend requests.
// In local dev, "/api" is proxied by Vite to your backend target.
const API = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Attach JWT to every request when available.
// .NET JwtBearer authentication expects: Authorization: Bearer <token>
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
