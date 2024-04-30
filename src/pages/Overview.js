import NavBar from '../Components/Navbar';
import './Pages.css';
import Sidebar from '../Components/Sidebar/Sidebar';

export default function Overview() {
  return (
    <>
      <NavBar />
      <div className="Overview_page">
        <>
          <Sidebar />
        </>
        <div className="page_content">
          <h1>Overview page</h1>
        </div>
      </div>
    </>
  );
}
