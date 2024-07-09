import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  children: any;
};

function Modal({ open, onClose, children }: Props) {
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const modalRef = useRef<null | HTMLDivElement>(null);

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

  const handleKeyDown: React.KeyboardEventHandler<HTMLDialogElement> = (
    event
  ) => {
    if (event.key === "Escape") {
      closeDialog();
    }
  };

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (
        modalRef.current &&
        e.target instanceof Node &&
        !modalRef.current.contains(e.target)
      ) {
        closeDialog();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const dialog: JSX.Element | null = open ? (
    <dialog ref={dialogRef} onKeyDown={handleKeyDown} className={styles.modal}>
      <div ref={modalRef}>{children}</div>
    </dialog>
  ) : null;
  return dialog;
}

export default Modal;
