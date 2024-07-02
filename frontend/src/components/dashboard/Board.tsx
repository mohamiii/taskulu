import { useState } from "react";
import BOARDS from "../api/DUMMY_BOARDS.json";
import Modal from "./ProjectModal";
import CircularImage from "./CircularImage";
import { RiArrowDropDownLine } from "react-icons/ri";
import { GrOrganization } from "react-icons/gr";
import { FaRegStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import styles from "./Board.module.css";

export default function Board() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function handleCloseModal() {
    setModalIsOpen(false);
  }

  async function handleSubmit() {
    setModalIsOpen(false);
  }

  function handleClick() {
    setModalIsOpen(true);
  }

  return (
    <div className={styles["boards"]}>
      {BOARDS.map((board) => (
        <section key={board.id} className={styles["board-container"]}>
          <div className={styles["board-header"]}>
            <div className={styles["organization-logo"]}>
              <GrOrganization />
            </div>
            <h4 className={styles["board-title"]}>{board.title}</h4>
            <button className={styles["btn"]} onClick={handleClick}>
              ایجاد پروژه
            </button>
            <span className={styles["setting"]}>
              تنظیمات
              <RiArrowDropDownLine />
            </span>
          </div>
          <ul className={styles["project-cards"]}>
            {board.projects && board.projects.length > 0 ? (
              board.projects.map((project) => (
                <li key={project.id} className={styles["project-card"]}>
                  <div className={styles["project-header"]}>
                    <div className={styles["star-icon"]}>
                      <FaRegStar />
                    </div>
                    <div className={styles["project-title"]}>
                      {project.title}
                    </div>
                  </div>
                  <div className={styles["project-inner"]}>
                    <div className={styles["profile"]}>
                      <CircularImage />
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div key={null} className={styles["empty"]}>
                هنوز پروژه‌ای درست نشده است!
              </div>
            )}
          </ul>
        </section>
      ))}
      <button className={styles["add-board"]} onClick={() => {}}>
        ایجاد سازمان
        <FaPlus />
      </button>

      <Modal
        open={modalIsOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
