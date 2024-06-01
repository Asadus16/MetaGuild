import React from "react";
import NavBar from "../Components/Navbar";
import "./Pages.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import SettingsTab from "../Components/SettingsTab";
import { useNavigate, useParams } from "react-router-dom";
import { deleteDao } from "../utils/fetchers";

export default function Manage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  async function deleteMyDao(authToken, daoId) {
    try {
      const dao = await deleteDao(authToken, daoId);
      if (dao) {
        navigate("/explore");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const daoDeleter = () => {
    deleteMyDao(authToken, id);
  };

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
              <h1 style={{ color: "white" }}>
                Do you really want to Delete your DAO?
              </h1>
            </>
            <>
              <button className="dao_kill" onClick={daoDeleter}>
                DAO KillSwitch
              </button>
            </>
          </div>
        </div>
      </div>
    </>
  );
}
