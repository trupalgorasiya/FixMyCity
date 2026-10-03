import axios from "axios";

// Read API URL from environment variable, fallback to default localhost:8085/api
const rawUrl =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL;
  // "http://localhost:8085/api"

// Ensure API_BASE_URL always ends with /api (without trailing slash)
export const API_BASE_URL = rawUrl.replace(/\/+$/, "").endsWith("/api")
  ? rawUrl.replace(/\/+$/, "")
  : `${rawUrl.replace(/\/+$/, "")}/api`;

export const API_URL = API_BASE_URL;

// Server root URL without /api (e.g. http://localhost:8085 for static uploads/media/files)
export const SERVER_URL = API_BASE_URL.replace(/\/api$/, "");
export const BASE_URL = SERVER_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;