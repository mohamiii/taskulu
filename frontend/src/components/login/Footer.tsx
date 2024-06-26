import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles["footer"]}>
      <div className={styles["footer-links"]}>
        <a href="https://taskulu.com" className={styles["bottom-link"]}>
          Taskulu
        </a>
        &nbsp;|
        <a href="https://taskulu.com/fa/help" className={styles["bottom-link"]}>
          پشتیبانی
        </a>
      </div>
    </div>
  );
}
