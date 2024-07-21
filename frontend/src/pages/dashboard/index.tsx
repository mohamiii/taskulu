import BoardContextProvider from "@/store/board-context";
import Header from "@/components/dashboard/Header";
import AllBoards from "@/components/dashboard/AllBoards";

export default function Dashboard() {
  return (
    <BoardContextProvider>
      <Header />
      <AllBoards />
    </BoardContextProvider>
  );
}
