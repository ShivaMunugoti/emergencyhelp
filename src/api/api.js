import axios from "axios";

// Dynamically determine the API base URL
const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const baseURL = isLocal ? "http://localhost:5000/api" : "https://emergencyhelp.onrender.com/api";

console.log(`[NETWORK_COMMS] Initiating connection to: ${baseURL}`);

const API = axios.create({ baseURL });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
