import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../Sidebar/Sidebar.css";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { id } = useParams();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div
        className={`overview_page ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        {/* Hamburger Menu */}
        <div className="hamburger-menu" onClick={toggleSidebar}>
          <MenuRoundedIcon />
        </div>
        {/* Sidebar Content */}
        <div className="tabs">
          <Link to="/home">
            <button className="button4">Home</button>
          </Link>
          <Link to={`/explore/overview/${id}`}>
            <button className="button1">Overview</button>
          </Link>

          <Link to={`/explore/${id}/tasks`}>
            <button className="button3">Tasks Board</button>
          </Link>

          <Link to={`/explore/${id}/settings/profile`}>
            <button className="button2">Settings</button>
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
