import Image from "next/image";
import styles from "./Profile.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import CircularImage from "./CircularImage";

export default function ProfileImage() {
  const [menuDisplay, setMenuDisplay] = useState(false);

  function handleClick() {
    setMenuDisplay((prev) => !prev);
  }

  return (
    <>
      <div className={styles["header-profile"]}>
        <div className={styles["dropdown"]}>
          <div
            className={styles["user-avatar"]}
            onClick={() => {
              handleClick();
            }}
          >
            <CircularImage />
            <span className={styles["user-status-online"]}></span>
          </div>
          <div
            className={styles["menu"]}
            style={menuDisplay ? { display: "flex" } : { display: "none" }}
            onBlur={() => {
              setMenuDisplay(false);
            }}
            tabIndex={0}
          >
            <div className={styles["dropdown-header"]}>
              <span className={styles["header-text"]} title="azemco">
                azemco
              </span>
            </div>
            <Link className={styles["item"]} href="/account">
              <i className={styles["dropdown-icon-user"]}></i>
              حساب کاربری من
            </Link>
            <a className={styles["item"]} href="https://help.taskulu.com/fa">
              <i className={styles["dropdown-icon-help"]}></i>
              راهنما
            </a>
            <div className={styles["dropdown-divider"]}></div>
            <button className={styles["logout-btn"]}>
              <i className={styles["logout-icon"]}></i>
              خروج
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
