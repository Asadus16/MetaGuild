import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Sidebar/Sidebar.css';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';



export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={`overview_page ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Hamburger Menu */}
        <div className="hamburger-menu" onClick={toggleSidebar}>
          <MenuRoundedIcon />
        </div>
        {/* Sidebar Content */}
        <div className="tabs">
          <Link to="/home">
            <button className="button4">Home</button>
          </Link>
          <Link to="/explore/overview">
            <button className="button1">Overview</button>
          </Link>
<<<<<<< HEAD
          <Link to="/#">
            <button className="button2">Leaderboard</button>
          </Link>
          <Link to="/explore/overview">
            <button className="button3">Tasks Board</button>
          </Link>
          <Link to="#">
            <button className="button4">Spaces</button>
=======

          <Link to="/explore/taskbar">
            <button className="button3">Tasks Board</button>
          </Link>

          <Link to="/explore/settings/profile">
            <button className="button2">Settings</button>
>>>>>>> 7f9f54bb9b7612555eae2875842778e2355e04b7
          </Link>
          {/* Footer */}
          <footer className="footer">
            <h1>
              MetaGuild<small>©</small>
            </h1>
            <div>
              MetaGuild ©<br />
              All Rights Reserved 2024
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
