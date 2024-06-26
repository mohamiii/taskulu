import Image from "next/image";
import googleIcon from "/public/assets/images/google.svg";
import styles from "./OtherOptions.module.css";

export default function OtherOptions() {
  return (
    <div className={styles["other-options"]}>
      <div className={styles["auth-group"]}>
        <a className={styles["google-btn"]} href="">
          <span className={styles["google-icon"]}>
            <Image src={googleIcon} alt="" />
          </span>
          <span className={styles["login-btn-txt"]}>اتصال با گوگل</span>
        </a>
        <a className={styles["git-btn"]} href="">
          <span className={styles["btn-logo"]}>
            <i className={styles["git-icon"]}></i>
          </span>
          <span className={styles["login-btn-txt"]}>اتصال با گیت&zwnj;هاب</span>
        </a>
      </div>
    </div>
  );
}
