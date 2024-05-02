import NavBar from '../Components/Navbar';
import './Pages.css';
import Sidebar from '../Components/Sidebar/Sidebar';
import Boards from '../Components/BoardContainer/BoardContainer';

export default function Overview() {
  return (
    <>
      <NavBar />
      <div className="Overview_page">
        <div className="overview_sidebar">
          <Sidebar />
        </div>
        <div className="page_content">
          <Boards />
        </div>
      </div>
    </>
  );
}
