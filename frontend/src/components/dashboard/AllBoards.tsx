import { useContext, useState } from "react";
import styles from "./AllBoards.module.css";
import BoardModal from "./modals/BoardModal";
import { FaPlus } from "react-icons/fa";
import Board from "./Board";
import { BoardContext } from "@/store/board-context";

export default function AllBoards() {
  const [boardModalIsOpen, setBoardModalIsOpen] = useState(false);

  const { boards } = useContext(BoardContext);

  return (
    <div className={styles["boards"]}>
      {boards && boards.map((board) => <Board key={board.id} board={board} />)}
      <button
        className={styles["add-board"]}
        onClick={() => {
          setBoardModalIsOpen(true);
        }}
      >
        ایجاد سازمان
        <FaPlus />
      </button>

      <BoardModal
        open={boardModalIsOpen}
        onClose={() => {
          setBoardModalIsOpen(false);
        }}
      />
    </div>
  );
}
