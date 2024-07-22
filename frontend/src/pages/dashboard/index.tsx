import BoardContextProvider from "@/store/board-context";
import Header from "@/components/dashboard/Header";
import AllBoards from "@/components/dashboard/AllBoards";
import { useEffect } from "react";
import router from "next/router";

export default function Dashboard() {
  useEffect(() => {
    const testAccessToken = localStorage.getItem("accessToken");
    if (!testAccessToken) {
      router.push("/account/login");
    }
  }, []);
  return (
    <BoardContextProvider>
      <Header />
      <AllBoards />
    </BoardContextProvider>
  );
}
