import { useEffect, useState } from "react";
import BOARDS from "../api/DUMMY_BOARDS.json";
import ProjectModal from "./ProjectModal";
import CircularImage from "./CircularImage";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiSolidBuilding } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import styles from "./Board.module.css";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzODE2MzcwLCJpYXQiOjE3MTk0OTYzNzAsImp0aSI6IjA0NGViYmEyZmRmODRkNzJhOTA3OTc4YmRkNTVhNDY4IiwidXNlcl9pZCI6MX0.azJVyQ3fbVmHnIwC_yvP5tAPONpXujs7UsHUdqHZ2oM";

const params = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    Authorization: `Bearer ${token}`,
    accept: "application/json",
  },
});

const Board: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [boards, setBoards] = useState(BOARDS);

  async function handleCloseModal() {
    setModalIsOpen(false);
  }

  async function handleSubmit() {
    setModalIsOpen(false);
  }

  function handleClick() {
    setModalIsOpen(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await params.get("board/");
        setBoards(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles["boards"]}>
      {boards.map((board) => (
        <section key={board.id} className={styles["board-container"]}>
          <div className={styles["board-header"]}>
            <div className={styles["organization-logo"]}>
              <BiSolidBuilding />
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

      <ProjectModal
        open={modalIsOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Board;
