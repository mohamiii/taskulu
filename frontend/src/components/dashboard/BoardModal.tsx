import { useContext, useState } from "react";
import Modal from "../customComponent/Modal";
import styles from "./BoardModal.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BoardContext } from "@/store/board-context";
import { api } from "@/components/api/api";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function BoardModal({ open, onClose }: Props) {
  const [boardTitle, setBoardTitle] = useState<string>("");

  const { boards, setBoards } = useContext(BoardContext);

  const handleCreateBoard = async () => {
    if (boardTitle.length > 0) {
      try {
        const body = { title: boardTitle };
        const response = await api.post("board/create/", body);
        if (response.status === 201) {
          const allBoards = [...boards, response.data];
          setBoards(allBoards);
          setBoardTitle("");
          onClose();
        } else {
          toast.error("خطا در ساخت سازمان");
        }
      } catch (error) {
        console.error(error);
        toast.error("خطا در ساخت سازمان");
      }
    } else {
      toast.error("عنوان سازمان نمی‌تواند خالی باشد");
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCreateBoard();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles["container"]} onKeyDown={handleKeyDown}>
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
              setBoardTitle(event.target.value);
            }}
          />
        </form>
        <div className={styles["footer"]}>
          <button
            disabled={boardTitle.length === 0}
            onClick={handleCreateBoard}
            className={
              boardTitle.length > 0 ? styles["btn"] : styles["btn-disabled"]
            }
          >
            بساز
          </button>
          <button onClick={onClose} className={styles["cancel"]}>
            لغو
          </button>
        </div>
      </div>
      <ToastContainer rtl position="bottom-left" pauseOnFocusLoss={false} />
    </Modal>
  );
}
