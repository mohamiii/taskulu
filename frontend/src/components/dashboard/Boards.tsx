import { useEffect, useState } from "react";
import styles from "./Boards.module.css";
import BoardModal from "./BoardModal";
import ProjectModal from "./ProjectModal";
import CircularImage from "./CircularImage";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidBuilding } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

interface Board {
  id: number;
  title: string;
  projects: Project[];
}

interface Project {
  id: number;
  title: string;
}
type Props = {
  boards: Board[];
  setBoards: (boards: Board[]) => void;
};

export default function Boards({ boards, setBoards }: Props) {
  const [projectModalIsOpen, setProjectModalIsOpen] = useState(false);
  const [boardModalIsOpen, setBoardModalIsOpen] = useState(false);

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
        boards={boards ? boards : []}
        setBoards={setBoards}
      />
    </div>
  );
}
