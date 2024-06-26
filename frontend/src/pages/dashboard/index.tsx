import Header from "@/components/dashboard/Header";
import styles from "/src/pages/dashboard/index.module.css";

export default function Dashboard() {
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
