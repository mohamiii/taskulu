import { useContext, useEffect, useRef, useState } from "react";
import Modal from "../customComponent/Modal";
import styles from "./ProjectModal.module.css";
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BoardContext } from "@/store/board-context";
import { api } from "../api/api";
import { toast, ToastContainer } from "react-toastify";

type Props = {
  open: boolean;
  onClose: () => void;
};

interface Project {
  id: number;
  title: string;
}

export default function ProjectModal({ open, onClose }: Props) {
  const { boards, projects, setProjects } = useContext(BoardContext);

  const [projectBoard, setProjectBoard] = useState(boards[0]);
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [boardsDropdownIsOpen, setBoardsDropdownIsOpen] = useState(false);
  const [localProjects, setLocalProjects] = useState(projects);

  const handleCreateProject = async () => {
    if (projectTitle.length > 0) {
      try {
        setLocalProjects(projectBoard.projects);
        const body = { title: projectTitle, board: projectBoard.id };
        const response = await api.post("project/create/", body);
        if (response.status === 201) {
          const allProjects = [...projects, response.data];
          setLocalProjects(allProjects);
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
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCreateProject();
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles["modal-container"]} onKeyDown={handleKeyDown}>
        <div className={styles["header"]}>
          <h3>ایجاد پروژه جدید</h3>
          <span onClick={onClose} className={styles["modal-close"]}>
            <div className={styles["cross-icon"]}>
              <IoClose />
            </div>
          </span>
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
          <div className={styles["dropdown"]}>
            <p className={styles["dropdown-boards"]}>نام سازمان</p>
            <div className={styles["dropdown-icon"]}>
              <RiArrowDropDownLine />
            </div>
          </div>
        </div>
        <div className={styles["footer"]}>
          <button onClick={handleCreateProject} className={styles["btn"]}>
            بساز
          </button>
        </div>
      </div>
      <ToastContainer rtl position="bottom-left" pauseOnFocusLoss={false} />
    </Modal>
  );
}
