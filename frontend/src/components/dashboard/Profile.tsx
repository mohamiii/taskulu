import Image from "next/image";
import styles from "./Profile.module.css";
import { useEffect, useState } from "react";

export default function ProfileImage() {
  const [menuDisplay, setMemuDisplay] = useState(false);

  function handleClick() {
    setMemuDisplay((prev) => !prev);
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
            {/* Todo: add user image to backend*/}
            <Image
              className={styles["avatar-img"]}
              src="data:image/png;base64,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"
              alt="$username"
              height={32}
              width={32}
            />
            <span className={styles["user-status-online"]}></span>
          </div>
          <div
            className={styles["menu"]}
            style={menuDisplay ? { display: "flex" } : { display: "none" }}
            onBlur={() => {
              setMemuDisplay(false);
            }}
            tabIndex={0}
          >
            <div className={styles["dropdown-header"]}>
              <span className={styles["header-text"]} title="mohamiii">
                mohamiii
              </span>
            </div>
            <a className={styles["item"]} href="/a/account">
              <i className={styles["dropdown-icon-user"]}></i>
              حساب کاربری من
            </a>
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
