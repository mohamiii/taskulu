import axios from "axios";
import { createContext, ReactElement, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "@/components/api/api";

interface Board {
  id: number;
  title: string;
  projects: Project[];
}

interface Project {
  id: number;
  title: string;
}

export const BoardContext = createContext({
  boards: [] as Board[],
  setBoards: (boards: Board[]) => {},
  projects: [] as Project[],
  setProjects: (projects: Project[]) => {},
});

export default function BoardContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchBoards = async () => {
    try {
      const response = await api.get("board/");
      setBoards(response.data);
    } catch (error) {
      console.error(error);
      toast.error("خطا در دریافت اطلاعات");
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const contextValue = {
    boards,
    setBoards,
    projects,
    setProjects,
  };
  return (
    <BoardContext.Provider value={contextValue}>
      {children}
      <ToastContainer rtl position="top-center" pauseOnFocusLoss={false} />
    </BoardContext.Provider>
  );
}
