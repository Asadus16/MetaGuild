import NavBar from '../Components/Navbar';
import './Pages.css';
import Sidebar from '../Components/Sidebar/Sidebar';
import Boards from '../Components/BoardContainer/BoardContainer';

export default function TaskBoard() {
  return (
    <>
      <NavBar />
      <div className=" Taskboard_page">
        <div className=" taskBoard_sidebar">
          <Sidebar />
        </div>
        <div className=" Taskpage_content">
          <Boards />
        </div>
      </div>
    </>
  );
}
