import { useState } from "react";
import Profile from "../dashboard/Profile";
import styles from "./Header.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus } from "react-icons/fa";
import PageModal from "./modals/PageModal";

type Props = {
  pages: Pages[];
  setPages: (pages: Pages[]) => void;
  page?: Pages;
  setPage: (page: Pages) => void;
  project: Project;
  fetchProject: () => void;
};
export default function Header({
  pages,
  setPages,
  page,
  setPage,
  project,
  fetchProject
}: Props) {
  const [pageModalIsOpen, setPageModalIsOpen] = useState(false);

  function handlePageClick(event: Pages) {
    setPage(event);
  }

  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["header-title"]}>
          {pages && pages.length > 0 ? (
            pages.map((item) => (
              <span
                onClick={() => {
                  handlePageClick(item);
                }}
                key={item.id}
                style={
                  page && item.id === page.id
                    ? { borderBottom: "4px solid #0c88ed" }
                    : {}
                }
              >
                {item.title}
              </span>
            ))
          ) : (
            <span key={null}>افزودن صفحه</span>
          )}
          <span
            className={styles["plus-icon"]}
            onClick={() => {
              setPageModalIsOpen(true);
            }}
          >
            <FaPlus />
          </span>
        </div>
        <div className={styles["project-manager"]}>
          <div
            className={styles["project-switch"]}
            onClick={() => {
              toast.error("کار نمی‌کنه!");
            }}
          >
            <div
              className={styles["switch-on"]}
              title="در حال نمایش کارهای فعال"
            >
              <input type="checkbox" className={styles["switch-checkbox"]} />
              <label className={styles["switch-btn"]}>
                <i className={styles["switch-icon"]}></i>
              </label>
            </div>
          </div>
          <form className={styles["project-search"]}>
            <input
              type="search"
              className={styles["project-search-input"]}
              placeholder="جستجو..."
            />
            <i className={styles["project-search-icon"]}></i>
          </form>
          <Profile />
        </div>
      </div>

      <PageModal
        open={pageModalIsOpen}
        onClose={() => {
          setPageModalIsOpen(false);
        }}
        pages={pages}
        setPages={setPages}
        setPage={setPage}
        project={project}
        fetchProject={fetchProject}
      />
    </>
  );
}
