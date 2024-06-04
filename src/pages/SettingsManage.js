import React, { useState } from "react";
import NavBar from "../Components/Navbar";
import "./Pages.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import SettingsTab from "../Components/SettingsTab";
import { useNavigate, useParams } from "react-router-dom";
import { deleteDao } from "../utils/fetchers";
import { Alert } from "@mui/material";

export default function Manage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const [alertBar, setAlertBar] = useState(false);

  async function deleteMyDao(authToken, daoId) {
    try {
      const dao = await deleteDao(authToken, daoId);
      handleAlert();
      if (dao) {
        navigate("/explore");
      }
    } catch (error) {
      handleAlert();
      console.log(error);
    }
  }

  const daoDeleter = () => {
    deleteMyDao(authToken, id);
  };

  const handleAlert = () => {
    setAlertBar(true);
    const timeoutId = setTimeout(() => setAlertBar(false), 2000); // Set timeout for 3 seconds

    return () => clearTimeout(timeoutId); // Cleanup function for current timeout
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
          {alertBar && (
            <Alert
              variant="filled"
              severity="error"
              style={{
                width: "fit-content",
                marginLeft: "auto",
                marginRight: "1rem",
              }}
            >
              Unauthorized to delete DAO
            </Alert>
          )}
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
