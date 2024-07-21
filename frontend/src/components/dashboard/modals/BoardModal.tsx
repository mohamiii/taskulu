import { api } from "@/components/api/api";
import { BoardContext } from "@/store/board-context";
import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../customComponent/Modal";
import styles from "./BoardModal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  boardId?: number;
};

export default function BoardModal({ open, onClose, title, boardId }: Props) {
  const [boardTitle, setBoardTitle] = useState<string>(title || "");

  const { boards, setBoards } = useContext(BoardContext);

  const handleCreateEditBoard = async () => {
    if (boardTitle.length > 0) {
      if (boardId) {
        //for editing board name
        try {
          const body = { title: boardTitle };
          const response = await api.put(`board/update/${boardId}/`, body);
          if (response.status === 200) {
            setBoards(
              boards.map((board) =>
                board.id === boardId ? { ...response.data } : board
              )
            );
            onClose();
          } else {
            toast.error("خطا در بروزرسانی سازمان");
          }
        } catch (error) {
          console.error(error);
          toast.error("خطا در بروزرسانی سازمان");
        }
      } else {
        //for creating a new board
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
      }
    } else {
      toast.error("عنوان سازمان نمی‌تواند خالی باشد");
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCreateEditBoard();
    }
  };

  function closeModal() {
    setBoardTitle(title || "");
    onClose();
  }

  return (
    <Modal open={open} onClose={closeModal}>
      <div className={styles["container"]} onKeyDown={handleKeyDown}>
        <div className={styles["tabs"]}>
          <div className={styles["active"]}>تنظیمات سازمان</div>
          <div className={styles["inactive"]}>مدیریت کاربران</div>
        </div>
        <form className={styles["form"]}>
          <label>عنوان سازمان</label>
          <input
            value={boardTitle}
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
            onClick={handleCreateEditBoard}
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
    </Modal>
  );
}
