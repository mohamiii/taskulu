import { BoardContext } from "@/store/board-context";
import { useContext, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { api } from "../../api/api";
import Modal from "../../customComponent/Modal";
import styles from "./ProjectModal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  projects?: Projects[];
  setProjects?: (projects: Projects[]) => void;
  board?: Board;
};

export default function ProjectModal({
  open,
  onClose,
  projects,
  setProjects,
  board,
}: Props) {
  const { boards } = useContext(BoardContext);

  const [projectBoard, setProjectBoard] = useState<Board>(board || boards[0]);
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  useEffect(() => {
    !board && setProjectBoard(boards[0]);
  }, [board, boards]);

  const handleCreateProject = async () => {
    if (boards && boards.length > 0) {
      if (projectTitle.length > 0) {
        try {
          const body = { title: projectTitle, board: projectBoard.id };
          const response = await api.post("project/create/", body);
          if (response.status === 201) {
            if (projects && setProjects) {
              const allProjects = [...projects, response.data];
              setProjects(allProjects);
            }
            setProjectTitle("");
            onClose();
          } else {
            toast.error("خطا در ساخت پروژه");
          }
        } catch (error) {
          console.error(error);
          toast.error("خطا در ساخت پروژه");
        }
      } else {
        toast.error("عنوان پروژه نمی‌تواند خالی باشد");
      }
    } else {
      toast.error("ابتدا سازمان بسازید");
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCreateProject();
    }
  };

  function handleBoardClick(board: Board) {
    setDropdownIsOpen(false);
    setProjectBoard(board);
  }

  const dropdownRef = useRef<HTMLDivElement>(null);

  function closeModal() {
    onClose();
    setDropdownIsOpen(false);
    setProjectBoard(board || boards[0]);
  }

  return (
    <Modal open={open} onClose={closeModal}>
      <div className={styles["modal-container"]} onKeyDown={handleKeyDown}>
        <div className={styles["header"]}>
          <h3>ایجاد پروژه جدید</h3>
          <div onClick={onClose} className={styles["cross-icon"]}>
            <IoClose />
          </div>
        </div>
        <form className={styles["project-name"]}>
          <input
            placeholder="عنوان پروژه"
            className={styles["input"]}
            onChange={(event) => {
              setProjectTitle(event.target.value);
            }}
          />
        </form>
        <div className={styles["board"]}>
          سازمان
          <div
            onClick={() => {
              setDropdownIsOpen((prev) => !prev);
            }}
            className={styles["dropdown"]}
            ref={dropdownRef}
          >
            <div className={styles["dropdown-boards"]}>
              {projectBoard && projectBoard.title}
              <div className={styles["dropdown-icon"]}>
                <RiArrowDropDownLine />
              </div>
            </div>

            <div
              className={styles["menu"]}
              style={dropdownIsOpen ? { display: "flex" } : { display: "none" }}
            >
              <ul className={styles["boards"]}>
                {boards && boards.length > 0 ? (
                  boards.map((board) => (
                    <li
                      onClick={() => handleBoardClick(board)}
                      className={styles["item"]}
                      key={board.id}
                    >
                      <p className={styles["title"]}>{board.title}</p>
                    </li>
                  ))
                ) : (
                  <li className={styles["item"]}>هیچ سازمانی وجود ندارد</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles["footer"]}>
          <button onClick={handleCreateProject} className={styles["btn"]}>
            بساز
          </button>
        </div>
      </div>
    </Modal>
  );
}
