import { useEffect, useState } from "react";
import Boards from "@/components/dashboard/Boards";
import Header from "@/components/dashboard/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzODE2MzcwLCJpYXQiOjE3MTk0OTYzNzAsImp0aSI6IjA0NGViYmEyZmRmODRkNzJhOTA3OTc4YmRkNTVhNDY4IiwidXNlcl9pZCI6MX0.azJVyQ3fbVmHnIwC_yvP5tAPONpXujs7UsHUdqHZ2oM";

const api = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    Authorization: `Bearer ${token}`,
    accept: "application/json",
  },
});

interface Board {
  id: number;
  title: string;
  projects: Project[];
}

interface Project {
  id: number;
  title: string;
}

export default function Dashboard() {
  const [boards, setBoards] = useState<Board[]>();

  const fetchData = async () => {
    try {
      const response = await api.get("board/");
      setBoards(response.data);
    } catch (error) {
      console.error(error);
      toast.error("خطا در دریافت اطلاعات");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Boards boards={boards ? boards : []} setBoards={setBoards} />
      <ToastContainer position="top-center" pauseOnFocusLoss={false} />
    </>
  );
}
