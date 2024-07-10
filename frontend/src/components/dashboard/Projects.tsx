import styles from "./Projects.module.css";
import CircularImage from "./CircularImage";
import { FaRegStar } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { BoardContext } from "@/store/board-context";

export default function Projects({ boardId }: { boardId: number }) {
  const { boards, projects, setProjects } = useContext(BoardContext);
  const [localProjects, setLocalProjects] = useState(projects);

  useEffect(() => {
    if (boards && boards[boardId]) {
      const updatedProjects = boards[boardId].projects;
      setLocalProjects(updatedProjects);
    }
    return () => {
      setLocalProjects([]);
    };
  }, [boardId, boards, setProjects]);

  return (
    <ul className={styles["project-cards"]}>
      {localProjects && localProjects.length > 0 ? (
        localProjects.map((project) => (
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
