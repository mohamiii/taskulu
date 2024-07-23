import axios from "axios";

// Default config options
const defaultOptions = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create instance
export let api = axios.create(defaultOptions);

// Set the AUTH token for any request
api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("accessToken");
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
  return config;
});
