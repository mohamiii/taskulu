import styles from "./Project.module.css";
import CircularImage from "./CircularImage";
import { FaRegStar } from "react-icons/fa";
import Link from "next/link";

export default function Project({ project }: { project: Projects }) {
  return (
    <Link
      key={project.id}
      className={styles["project-card"]}
      href={`/dashboard/project/${project.id}/tasks`}
    >
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
    </Link>
  );
}
