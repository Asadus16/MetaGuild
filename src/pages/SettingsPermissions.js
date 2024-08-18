import React, { useEffect, useState } from "react";
import NavBar from "../Components/Navbar";
import "./Pages.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import { Select, Space } from "antd";
import SettingsTab from "../Components/SettingsTab";
import {
  assignTaskToUser,
  getDaoMembers,
  getDaoTasks,
} from "../utils/fetchers";
import { useParams } from "react-router-dom";
import { Alert } from "@mui/material";

export default function SettingPerm() {
  const [taskTitle, setTaskTitle] = useState([]);
  const [taskMembers, setTaskMembers] = useState([]);
  const [manageDAORole, setManageDAORole] = useState([]);
  const [manageDAOMember, setManageDAOMember] = useState("");
  const [daoMembers, setDaoMembers] = useState({});
  const [daoTasks, setDaoTasks] = useState(null);
  const [alertBar, setAlertBar] = useState(false);
  const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const authToken = localStorage.getItem("authToken");

  async function fetchDaoTasks(daoId) {
    try {
      const daoTaskList = await getDaoTasks(daoId);
      setDaoTasks(daoTaskList);
    } catch (error) {
      console.log(error);
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUpdateCreateTask = async () => {
    try {
      const response = await assignTaskToUser(
        authToken,
        taskTitle,
        taskMembers
      );

      if (response && response.error) {
        handleAlert();
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateManageDAO = () => {
    console.log("Manage DAO Role:", manageDAORole);
    console.log("Manage DAO Member:", manageDAOMember);
  };

  const handleChangeTaskTitle = (value) => {
    setTaskTitle(value);
    console.log(value);
  };

  const handleChangeTaskMembers = (value) => {
    setTaskMembers(value);
    console.log(value);
  };

  const handleChangeManageDAORole = (value) => {
    setManageDAORole(value);
  };

  const handleChangeManageDAOMember = (value) => {
    setManageDAOMember(value);
  };

  async function fetchDaoMembers(daoId) {
    try {
      const daoMemberList = await getDaoMembers(daoId);
      setDaoMembers(daoMemberList);
      // setDaoData(dao);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAlert = (message) => {
    setAlertBar(true);
    const timeoutId = setTimeout(() => setAlertBar(false), 2000); // Set timeout for 3 seconds

    return () => clearTimeout(timeoutId); // Cleanup function for current timeout
  };

  useEffect(() => {
    fetchDaoMembers(id);
    fetchDaoTasks(id);
  }, []);

  return (
    <>
      <NavBar />

      <div className="permissions_page">
        <div
          className={`settings_sidebar ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
        <div className="settings_content">
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
              User already Assigned
            </Alert>
          )}
          <SettingsTab />
          <div className="perm_cards">
            <h1 style={{ color: "white" }}>Who can Work on the task</h1>

            <div className="perm_card1">
              <div className="perm_card1margin">
                <div className="perm_card11">
                  <h2 style={{ width: "300px", textAlign: "start" }}>
                    Select Task
                  </h2>
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      mode="single"
                      allowClear
                      style={{
                        width: "100%",
                        border: "2px solid #757575",
                        borderRadius: "7px",
                      }}
                      placeholder="Please select the task"
                      onChange={handleChangeTaskTitle}
                      options={
                        daoTasks &&
                        Object.keys(daoTasks).map((key) => ({
                          label: daoTasks[key].title,
                          value: daoTasks[key].id,
                        }))
                      }
                    />
                  </Space>
                </div>
                <div className="perm_card11111">
                  <h2 style={{ width: "300px", textAlign: "start" }}>
                    Choose Member
                  </h2>
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      mode="single"
                      allowClear
                      style={{
                        width: "100%",
                        border: "2px solid #757575",
                        borderRadius: "7px",
                      }}
                      placeholder="Please select the Contributor"
                      onChange={handleChangeTaskMembers}
                      options={Object.keys(daoMembers).map((key) => ({
                        label: daoMembers[key].User.email_address,
                        value: daoMembers[key].User.id,
                      }))}
                    />
                    <button
                      onClick={handleUpdateCreateTask}
                      className="update1"
                    >
                      Update
                    </button>
                  </Space>
                </div>
              </div>
            </div>

            <h1 style={{ color: "white" }}>Who can Manage the DAO</h1>

            <div className="perm_card2">
              <div className="perm_card2margin">
                <div className="perm_card22">
                  <h2 style={{ width: "300px", textAlign: "start" }}>
                    Select Role
                  </h2>
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{
                        width: "100%",
                        border: "2px solid #757575",
                        borderRadius: "7px",
                      }}
                      placeholder="Please select the role"
                      onChange={handleChangeManageDAORole}
                      options={[
                        { label: "DAO Admin", value: "admin" },
                        { label: "Contributor", value: "contributor" },
                      ]}
                    />
                  </Space>
                </div>
                <div className="perm_card22222">
                  <h2 style={{ width: "300px", textAlign: "start" }}>
                    Choose Member
                  </h2>
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{
                        width: "100%",
                        border: "2px solid #757575",
                        borderRadius: "7px",
                      }}
                      placeholder="Please select the Contributor"
                      onChange={handleChangeManageDAOMember}
                      options={Object.values(daoMembers).map((member) => ({
                        label: member.name,
                        value: member.User.contract_address,
                      }))}
                    />

                    <button onClick={handleUpdateManageDAO} className="update2">
                      Update
                    </button>
                  </Space>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
