import Boards from "@/components/dashboard/Boards";
import Header from "@/components/dashboard/Header";
import BoardContextProvider from "@/store/board-context";

export default function Dashboard() {
  return (
    <BoardContextProvider>
      <Header />
      <Boards />
    </BoardContextProvider>
  );
}
