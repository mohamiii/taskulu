import Modal from "@/components/customComponent/Modal";
import React, { useState } from "react";
import styles from "./PageModal.module.css";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { api } from "@/components/api/api";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  onClose: () => void;
  pages: Pages[];
  setPages: (pages: Pages[]) => void;
  setPage: (page: Pages) => void;
  project: Projects;
  fetchProject: () => void;
};

export default function PageModal({
  open,
  onClose,
  pages,
  setPages,
  setPage,
  project,
  fetchProject,
}: Props) {
  const [pageTitle, setPageTitle] = useState("");

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCreatePage();
    }
  };

  const handleCreatePage = async () => {
    if (pageTitle.length > 0) {
      try {
        const body = { title: pageTitle, project: project.id };
        const response = await api.post("page/create/", body);
        if (response.status === 201) {
          const allPages = [...pages, response.data];
          setPages(allPages);
          setPage(response.data);
          setPageTitle("");
          fetchProject();
        } else {
          toast.error("خطا در ساخت صفحه");
        }
      } catch (error) {
        console.error(error);
        toast.error("خطا در ساخت صفحه");
      }
    } else {
      toast.error("عنوان نباید خالی باشد");
    }
  };

  function submit() {
    if (pageTitle.length > 0) {
      handleCreatePage();
    }
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles["modal-container"]} onKeyDown={handleKeyDown}>
        <div className={styles["header"]}>
          <div className={styles["header-text"]}>
            <h3>مدیریت صفحه‌ها</h3>
          </div>
          <div onClick={onClose} className={styles["cross-icon"]}>
            <IoClose />
          </div>
        </div>

        <div className={styles["body"]}>
          {pages &&
            pages.length > 0 &&
            pages.map((item) => (
              <div key={item.id} className={styles["page"]}>
                <span className={styles["page-title"]}>{item.title}</span>
              </div>
            ))}

          <div className={styles["input-box"]}>
            <input
              className={styles["input"]}
              placeholder="نام صفحه را وارد کنید..."
              onChange={(event) => {
                setPageTitle(event.target.value);
              }}
              value={pageTitle}
            ></input>
            <span className={styles["plus-icon"]} onClick={handleCreatePage}>
              <FaPlus />
            </span>
          </div>
        </div>

        <div className={styles["footer"]}>
          <button onClick={submit} className={styles["btn"]}>
            اعمال
          </button>
          <button onClick={onClose} className={styles["cancel"]}>
            لغو
          </button>
        </div>
      </div>
    </Modal>
  );
}
