import Board from "@/components/dashboard/Board";
import Header from "@/components/dashboard/Header";
import styles from "@/pages/dashboard/index.module.css";
import axios from "axios";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzODE2MzcwLCJpYXQiOjE3MTk0OTYzNzAsImp0aSI6IjA0NGViYmEyZmRmODRkNzJhOTA3OTc4YmRkNTVhNDY4IiwidXNlcl9pZCI6MX0.azJVyQ3fbVmHnIwC_yvP5tAPONpXujs7UsHUdqHZ2oM";

// const params = axios.create({
//   baseURL: "http://localhost:8000/",
//   headers: {
//     Authorization: `Bearer ${token}`,
//     accept: "application/json",
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Headers": "*",
//     "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
//   },
// });

// params
//   .get("/project/1/")
//   .then(() => {
//     console.log(
//       "%c" + "Worked",
//       "padding: 0.15rem; background: #04406b; color: #fcfabd"
//     );
//   })
//   .catch(() => {
//     console.log(
//       "%c" + "NOT WORKING",
//       "padding: 0.15rem; background: red; color: #fcfabd"
//     );
//   });

export default function Dashboard() {
  return (
    <>
      <Header />
      <Board />
    </>
  );
}
