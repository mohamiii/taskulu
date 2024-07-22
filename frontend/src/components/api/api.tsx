import axios from "axios";

const accessToken =
  typeof window !== "undefined"
    ? window.localStorage.getItem("accessToken")
    : false;

export const api = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    accept: "application/json",
  },
});
