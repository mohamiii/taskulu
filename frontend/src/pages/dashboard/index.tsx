import Header from "@/components/dashboard/Header";
import styles from "@/pages/dashboard/index.module.css";
import api from "@/components/api/Boards";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await api.get("/");
        console.log("👉 ~ fetchBoards ~ response:", response);
        console.log(
          "%c" + "boards" + response.data,
          "padding: 0.15rem; background: #04406b; color: #fcfabd"
        );
      } catch (err: any) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(` Error: ${err.message} `);
        }
      }
    };

    fetchBoards();
  }, []);

  return (
    <>
      <Header />
      <div className={styles["dashboard"]}>
        <div className={styles["dashboard-inner"]}>
          <h1>Dashboard</h1>
        </div>
      </div>
    </>
  );
}
