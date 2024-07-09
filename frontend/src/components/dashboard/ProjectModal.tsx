import { useEffect, useRef } from "react";
import Modal from "../customComponent/Modal";
import styles from "./ProjectModal.module.css";
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ProjectModal({ open, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles["modal-container"]}>
        <div className={styles["header"]}>
          <h3>ایجاد پروژه جدید</h3>
          <span onClick={onClose} className={styles["modal-close"]}>
            <div className={styles["cross-icon"]}>
              <IoClose />
            </div>
          </span>
        </div>
        <form className={styles["project-name"]}>
          <input placeholder="عنوان پروژه" className={styles["input"]} />
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
          <button onClick={onClose} className={styles["btn"]}>
            بساز
          </button>
        </div>
      </div>
    </Modal>
  );
}
