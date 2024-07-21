import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import { ToastContainer } from "react-toastify";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ open, onClose, children }: Props) {
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const modalRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialogRef.current?.close();
      document.body.style.overflow = "";
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

      <ToastContainer
        rtl
        draggable
        position="bottom-left"
        pauseOnFocusLoss={false}
      />
    </dialog>
  ) : null;
  return dialog;
}

export default Modal;
