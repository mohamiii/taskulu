import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/components/api/api";
import { toast, ToastContainer } from "react-toastify";
import Header from "@/components/tasks/Header";
import Sidebar from "@/components/tasks/Sidebar";
import Pages from "@/components/tasks/Pages";
import styles from "./tasks.module.css";

export default function Tasks() {
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [pages, setPages] = useState<Pages[]>([]);
  const [page, setPage] = useState<Pages>();

  const ProjectId = useParams();

  const projectId = ProjectId && Number(ProjectId.ProjectId);

  const fetchProject = async () => {
    try {
      const response = await api.get(`project/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.error(error);
      toast.error("خطا در دریافت اطلاعات");
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    if (project?.pages) {
      setPages(project.pages);
      setPage(project.pages[0]);
    }
  }, [project]);

  return project === undefined ? (
    <div>Project not found</div>
  ) : (
    <div className={styles["project"]}>
      <Sidebar projectTitle={project?.title} />
      <div className={styles["project-inner"]}>
        <Header
          pages={pages}
          setPages={setPages}
          page={page}
          setPage={setPage}
          project={project}
        />
        {pages && pages.length > 0 ? (
          <Pages page={page} setPage={setPage} />
        ) : (
          <p>ابتدا یک صفحه بسازید</p>
        )}
      </div>

      <ToastContainer
        rtl
        draggable
        position="top-center"
        pauseOnFocusLoss={false}
      />
    </div>
  );
}
