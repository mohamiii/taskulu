import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/components/api/api";
import { toast, ToastContainer } from "react-toastify";
import Header from "@/components/tasks/Header";
import Sidebar from "@/components/tasks/Sidebar";
import Page from "@/components/tasks/Page";
import styles from "./tasks.module.css";
import UserContextProvider from "@/store/user-context";
import router from "next/router";

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
    const testAccessToken = localStorage.getItem("accessToken");
    if (!testAccessToken) {
      router.replace("/account/login");
    }
    if (projectId) {
      fetchProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    if (project?.pages) {
      setPages(project.pages);
      !page && setPage(project.pages[0]);
    }
  }, [page, project]);

  return project === undefined ? (
    <div>Project not found</div>
  ) : (
    <div className={styles["project"]}>
      <Sidebar projectTitle={project?.title} />
      <div className={styles["project-inner"]}>
        <UserContextProvider>
          <Header
            pages={pages}
            setPages={setPages}
            page={page}
            setPage={setPage}
            project={project}
            fetchProject={fetchProject}
          />
        </UserContextProvider>
        {pages && pages.length > 0 ? (
          <Page page={page} fetchProject={fetchProject} />
        ) : (
          <p>ابتدا یک صفحه بسازید</p>
        )}
      </div>
    </div>
  );
}
