import { useState } from "react";
import Modal from "../customComponent/Modal";
import styles from "./BoardModal.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzODE2MzcwLCJpYXQiOjE3MTk0OTYzNzAsImp0aSI6IjA0NGViYmEyZmRmODRkNzJhOTA3OTc4YmRkNTVhNDY4IiwidXNlcl9pZCI6MX0.azJVyQ3fbVmHnIwC_yvP5tAPONpXujs7UsHUdqHZ2oM";

const params = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    Authorization: `Bearer ${token}`,
    accept: "application/json",
  },
});

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
  open: boolean;
  onClose: () => void;
  boards: Board[];
  setBoards: (boards: Board[]) => void;
};

export default function BoardModal({
  open,
  onClose,
  boards,
  setBoards,
}: Props) {
  const [boardName, setBoardName] = useState<string>("");

  const handleCreateBoard = async () => {
    try {
      const body = { title: boardName };
      const response = await params.post("board/create/", body);
      if (response.status === 201) {
        const allBoards = [...boards, response.data];
        setBoards(allBoards);
        onClose();
      } else {
        toast.error("خطا در ساخت سازمان");
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا در ساخت سازمان");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles["container"]}>
        <div className={styles["tabs"]}>
          <div className={styles["active"]}>تنظیمات سازمان</div>
          <div className={styles["inactive"]}>مدیریت کاربران</div>
        </div>
        <form className={styles["form"]}>
          <label>عنوان سازمان</label>
          <input
            className={styles["input"]}
            placeholder="عنوان سازمان را وارد کنید"
            onChange={(event) => {
              setBoardName(event.target.value);
            }}
          />
        </form>
        <div className={styles["footer"]}>
          <button onClick={handleCreateBoard} className={styles["btn"]}>
            بساز
          </button>
          <button onClick={onClose} className={styles["cancel"]}>
            لغو
          </button>
        </div>
      </div>

      <ToastContainer position="top-center" pauseOnFocusLoss={false} />
    </Modal>
  );
}
