import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Board.module.css";
import Project from "./Project";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidBuilding } from "react-icons/bi";
import ProjectModal from "./modals/ProjectModal";
import BoardModal from "./modals/BoardModal";
import { api } from "../api/api";
import { toast } from "react-toastify";
import { BoardContext } from "@/store/board-context";
import { TbSettingsStar } from "react-icons/tb";
import { RiArchive2Fill } from "react-icons/ri";
import { FiBarChart2 } from "react-icons/fi";

export default function Board({ board }: { board: Board }) {
  const [boardModalIsOpen, setBoardModalIsOpen] = useState(false);
  const [projectModalIsOpen, setProjectModalIsOpen] = useState(false);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [projects, setProjects] = useState<Projects[]>(board.projects);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { boards, setBoards } = useContext(BoardContext);

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        e.target instanceof Node &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  function handleTitleEdit() {
    setDropdownIsOpen(false);
    setBoardModalIsOpen(true);
  }

  const handleDeleteBoard = async () => {
    setDropdownIsOpen(false);
    if (
      confirm(
        `آیا از بستن سازمان ${board.title} و همه پروژه‌های داخل آن اطمینان دارید؟`
      )
    ) {
      try {
        const response = await api.delete(`board/delete/${board.id}/`);
        if (response.status === 200) {
          setBoards(boards.filter((item) => item.id !== board.id));
        } else {
          toast.error("خطا در حذف سازمان");
        }
      } catch (error) {
        console.error(error);
        toast.error("خطا در حذف سازمان");
      }
    }
  };

  return (
    <>
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
          <div className={styles["setting-dropdown"]} ref={dropdownRef}>
            <span
              className={styles["btn"]}
              onClick={() => {
                setDropdownIsOpen((prev) => !prev);
              }}
            >
              تنظیمات
              <RiArrowDropDownLine />
            </span>

            <div
              className={styles["menu"]}
              style={dropdownIsOpen ? { display: "flex" } : { display: "none" }}
            >
              <div onClick={handleTitleEdit} className={styles["item"]}>
                <TbSettingsStar />
                <span>تنظیمات سازمان</span>
              </div>
              <hr className={styles["dropdown-divider"]} />
              <div onClick={handleDeleteBoard} className={styles["danger"]}>
                <div className={styles["danger-icon"]}>
                  <RiArchive2Fill />
                </div>
                <span>بستن سازمان</span>
              </div>
            </div>
          </div>

          <div
            className={styles["analyze"]}
            onClick={() => {
              toast.error("کاری انجام نمی‌ده!");
            }}
          >
            <div className={styles["analyze-icon"]}>
              <FiBarChart2 />
            </div>
            تحلیل‌گر
          </div>
        </div>

        <div className={styles["project-cards"]}>
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <Project key={project.id} project={project} />
            ))
          ) : (
            <div key={null} className={styles["empty"]}>
              هنوز پروژه‌ای درست نشده است!
            </div>
          )}
        </div>
      </section>

      <BoardModal
        open={boardModalIsOpen}
        onClose={() => {
          setBoardModalIsOpen(false);
        }}
        title={board.title}
        boardId={board.id}
      />

      <ProjectModal
        open={projectModalIsOpen}
        onClose={() => {
          setProjectModalIsOpen(false);
        }}
        projects={projects}
        setProjects={setProjects}
        board={board}
      />
    </>
  );
}
