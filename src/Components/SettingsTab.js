import React from "react";
import "../pages/Pages.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import { Link, useLocation, useParams } from "react-router-dom";

export default function SettingsTab() {
  const location = useLocation();
  const { id } = useParams();

  return (
    <>
      <div className="settingstab_page">
        <div className="settings_tabs">
          <Link to={`/explore/${id}/settings/profile`}>
            <button
              className={`setting_btn1 ${
                location.pathname === "/explore/settings/profile"
                  ? "active"
                  : ""
              }`}
            >
              DAO Profile
            </button>
          </Link>

          <Link to={`/explore/${id}/settings/permissions`}>
            <button
              className={`setting_btn2 ${
                location.pathname === "/explore/settings/permissions"
                  ? "active"
                  : ""
              }`}
            >
              Permissions
            </button>
          </Link>

          <Link to={`/explore/${id}/settings/manage`}>
            <button
              className={`setting_btn3 ${
                location.pathname === "/explore/settings/manage" ? "active" : ""
              }`}
            >
              Manage DAO
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
