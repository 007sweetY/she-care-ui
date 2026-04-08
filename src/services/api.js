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

export default API;
