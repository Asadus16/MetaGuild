import { createTheme } from '@mui/material/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';
import '../Sidebar/Sidebar.css';

const drawerWidth = 290;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
export default function Sidebar() {
  return (
    <>
      <div className="overview_page">
        <div className="tabs">
          <Link to="/explore/overview">
            <button className="button1">Overview</button>
          </Link>

          <Link to="/#">
            <button className="button2">Leaderboard</button>
          </Link>

          <Link to="/explore/overview">
            <button className="button3">Tasks Board</button>
          </Link>

          <Link to="#">
            <button className="button4">Spaces</button>
          </Link>

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
