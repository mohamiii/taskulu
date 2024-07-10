import styles from "./Projects.module.css";
import CircularImage from "./CircularImage";
import { FaRegStar } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { BoardContext } from "@/store/board-context";

export default function Projects({ boardId }: { boardId: number }) {
  const { boards } = useContext(BoardContext);

  const projects = boards[boardId].projects;
  return (
    <ul className={styles["project-cards"]}>
      {projects && projects.length > 0 ? (
        projects.map((project) => (
          <li key={project.id} className={styles["project-card"]}>
            <div className={styles["project-header"]}>
              <div className={styles["star-icon"]}>
                <FaRegStar />
              </div>
              <div className={styles["project-title"]}>{project.title}</div>
            </div>
            <div className={styles["project-inner"]}>
              <div className={styles["profile"]}>
                <CircularImage />
              </div>
            </div>
          </li>
        ))
      ) : (
        <div key={null} className={styles["empty"]}>
          هنوز پروژه‌ای درست نشده است!
        </div>
      )}
    </ul>
  );
}
