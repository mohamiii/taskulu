import Image from "next/image";
import styles from "./Profile.module.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CircularImage from "./CircularImage";

export default function ProfileImage() {
  const [menuDisplay, setMenuDisplay] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        e.target instanceof Node &&
        !menuRef.current.contains(e.target)
      ) {
        setMenuDisplay(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <div className={styles["header-profile"]}>
        <div className={styles["dropdown"]}>
          <div
            className={styles["user-avatar"]}
            onClick={() => {
              setMenuDisplay((prev) => !prev);
            }}
          >
            <CircularImage />
            <span className={styles["user-status-online"]}></span>
          </div>
          <div
            ref={menuRef}
            className={styles["menu"]}
            style={menuDisplay ? { display: "flex" } : { display: "none" }}
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
            <hr className={styles["dropdown-divider"]} />
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
