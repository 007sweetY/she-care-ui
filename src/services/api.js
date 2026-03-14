import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:5001/api", // your .NET API URL
  headers: {
    "Content-Type": "application/json"
  }
});

export default API;