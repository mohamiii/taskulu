"use client";
import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import { IoClose } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

function Modal({ open, onClose, onSubmit }: Props) {
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const closeDialog = () => {
    dialogRef.current?.close();
    onClose();
  };

  const submit = () => {
    onSubmit();
    closeDialog();
  };

  const dialog: JSX.Element | null = open ? (
    <dialog className={styles["modal"]} ref={dialogRef}>
      <div className={styles["modal-inner"]}>
        <div className={styles["modal-header"]}>
          <h3>ایجاد پروژه جدید</h3>
          <span onClick={closeDialog} className={styles["modal-close"]}>
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
        <div className={styles["modal-footer"]}>
          <button onClick={submit} className={styles["btn"]}>
            بساز
          </button>
        </div>
      </div>
    </dialog>
  ) : null;
  return dialog;
}

export default Modal;
