import { useContext, useEffect, useState } from "react";
import styles from "./Boards.module.css";
import BoardModal from "./BoardModal";
import ProjectModal from "./ProjectModal";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidBuilding } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { BoardContext } from "@/store/board-context";
import Projects from "./Projects";

export default function Boards() {
  const [projectModalIsOpen, setProjectModalIsOpen] = useState(false);
  const [boardModalIsOpen, setBoardModalIsOpen] = useState(false);

  const { boards } = useContext(BoardContext);

  return (
    <div className={styles["boards"]}>
      {boards &&
        boards.map((board) => (
          <section key={board.id} className={styles["board-container"]}>
            <div className={styles["board-header"]}>
              <div className={styles["organization-icon"]}>
                <BiSolidBuilding />
              </div>
              <h4 className={styles["board-title"]}>{board.title}</h4>
              <button
                className={styles["btn"]}
                onClick={() => {
                  setProjectModalIsOpen(true);
                }}
              >
                ایجاد پروژه
              </button>
              <span className={styles["setting"]}>
                تنظیمات
                <RiArrowDropDownLine />
              </span>
            </div>
            <Projects boardId={board.id - 1} />
          </section>
        ))}
      <button
        className={styles["add-board"]}
        onClick={() => {
          setBoardModalIsOpen(true);
        }}
      >
        ایجاد سازمان
        <FaPlus />
      </button>

      <ProjectModal
        open={projectModalIsOpen}
        onClose={() => {
          setProjectModalIsOpen(false);
        }}
      />

      <BoardModal
        open={boardModalIsOpen}
        onClose={() => {
          setBoardModalIsOpen(false);
        }}
      />
    </div>
  );
}
