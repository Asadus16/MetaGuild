import React, { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import '../Sidebar/Sidebar.css';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const { id } = useParams();
  const location = useLocation(); // Hook to get the current URL path

  return (
    <>
      <div className={`page ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Hamburger Menu */}
        <div className="hamburger-container">
          <div className="hamburger-menu" onClick={toggleSidebar}>
            <MenuRoundedIcon />
          </div>
        </div>
        {/* Sidebar Content */}
        <div className="tabs">
          <Link to="/home">
            <button className={`button4 ${location.pathname === '/home' ? 'sidebar-active' : ''}`}>Home</button>
          </Link>
          <Link to={`/explore/overview/${id}`}>
            <button className={`button1 ${location.pathname === `/explore/overview/${id}` ? 'sidebar-active' : ''}`}>Overview</button>
          </Link>
          <Link to={`/explore/${id}/tasks`}>
            <button className={`button3 ${location.pathname === `/explore/${id}/tasks` ? 'sidebar-active' : ''}`}>Tasks Board</button>
          </Link>
          <Link to={`/explore/${id}/settings/profile`}>
            <button className={`button2 ${location.pathname.startsWith(`/explore/${id}/settings`) ? 'sidebar-active' : ''}`}>Settings</button>
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
