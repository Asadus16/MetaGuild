import NavBar from "../Components/Navbar";
import "./Pages.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import Boards from "../Components/BoardContainer/BoardContainer";
import KanbanBoard from "../Components/BoardContainer/KanbanBoard";

export default function Overview() {
  return (
    <>
      <NavBar />
      <div className="Overview_page">
        <div className="overview_sidebar">
          <Sidebar />
        </div>
        <div className="page_content">
          {/* <Boards /> */}
          <KanbanBoard />
        </div>
      </div>
    </>
  );
}
