import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzODE2MzcwLCJpYXQiOjE3MTk0OTYzNzAsImp0aSI6IjA0NGViYmEyZmRmODRkNzJhOTA3OTc4YmRkNTVhNDY4IiwidXNlcl9pZCI6MX0.azJVyQ3fbVmHnIwC_yvP5tAPONpXujs7UsHUdqHZ2oM";

export const api = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    Authorization: `Bearer ${token}`,
    accept: "application/json",
  },
});
