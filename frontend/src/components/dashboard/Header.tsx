import Profile from "./Profile";
import styles from "./Header.module.css";
import { useState } from "react";
import Modal from "./Modal";

export default function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function handleCloseModal() {
    setModalIsOpen(false);
  }

  async function handleSubmit() {
    setModalIsOpen(false);
  }

  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["header-inner"]}>
          <div className={styles["header-title"]}>
            <i className={styles["home-icon"]} />
            <span>صفحه اصلی</span>
            <i
              className={styles["plus-icon"]}
              onClick={() => {
                setModalIsOpen(true);
              }}
              title="افزودن پروژه"
            ></i>
          </div>
          <div className={styles["project-manager"]}>
            <div className={styles["project-switch"]}>
              <div
                className={styles["switch-on"]}
                title="در حال نمایش پروژه های فعال"
              >
                <input type="checkbox" className={styles["switch-checkbox"]} />
                <label className={styles["switch-btn"]}>
                  <i className={styles["switch-icon"]}></i>
                </label>
              </div>
            </div>
            <form className={styles["project-search"]}>
              <input
                type="search"
                className={styles["project-search-input"]}
                placeholder="جستجو پروژه&zwnj;ها"
              />
              <i className={styles["project-search-icon"]}></i>
            </form>
            <Profile />
          </div>
        </div>
      </div>
      <Modal
        open={modalIsOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </>
  );
}
