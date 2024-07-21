import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles["footer"]}>
      <div className={styles["footer-links"]}>
        <Link href="https://taskulu.com" className={styles["bottom-link"]}>
          Taskulu
        </Link>
        &nbsp;|
        <Link
          href="https://taskulu.com/fa/help"
          className={styles["bottom-link"]}
        >
          پشتیبانی
        </Link>
      </div>
    </div>
  );
}
