import React from 'react';
import NavBar from '../Components/Navbar';
import './Pages.css';
import Sidebar from '../Components/Sidebar/Sidebar';
import SettingsTab from '../Components/SettingsTab';

export default function Manage() {
  return (
    <>
      <NavBar />
      <div className="Overview_page">
        <div className="overview_sidebar">
          <Sidebar />
        </div>
        <div className="overview_content">
          <SettingsTab />
          <div className="delete_org">
            <>
              <h1 style={{ color: 'white' }}>Do you really want to Delete your DAO?</h1>
            </>
            <>
              <button className="dao_kill">DAO KillSwitch</button>
            </>
          </div>
        </div>
      </div>
    </>
  );
}
