import React, { useEffect, useState } from "react";
import NavBar from "../Components/Navbar";
import "./Pages.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import { Select, Space } from "antd";
import SettingsTab from "../Components/SettingsTab";
import { getDaoMembers } from "../utils/fetchers";
import { useParams } from "react-router-dom";

export default function SettingPerm() {
  const [createTaskRole, setCreateTaskRole] = useState([]);
  const [createTaskMembers, setCreateTaskMembers] = useState([]);
  const [manageDAORole, setManageDAORole] = useState([]);
  const [manageDAOMember, setManageDAOMember] = useState("");
  const [daoMembers, setDaoMembers] = useState({});
  const { id } = useParams();

  const handleUpdateCreateTask = () => {
    console.log("Create Task Role:", createTaskRole);
    console.log("Create Task Members:", createTaskMembers);
  };

  const handleUpdateManageDAO = () => {
    console.log("Manage DAO Role:", manageDAORole);
    console.log("Manage DAO Member:", manageDAOMember);
  };

  const handleChangeCreateTaskRole = (value) => {
    setCreateTaskRole(value);
  };

  const handleChangeCreateTaskMembers = (value) => {
    setCreateTaskMembers(value);
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
      // console.log("members : ", daoMemberList);
      setDaoMembers(daoMemberList);
      // setDaoData(dao);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDaoMembers(id);
  }, []);

  return (
    <>
      <NavBar />
      <div className="permissions_page">
        <div className="settings_sidebar">
          <Sidebar />
        </div>
        <div className="settings_content">
          <SettingsTab />
          <div className="perm_cards">
            <h1 style={{ color: "white" }}>Who can Create the tasks</h1>

            <div className="perm_card1">
              <div className="perm_card1margin">
                <div className="perm_card11">
                  <h2 style={{ width: "300px" }}>Select Role</h2>
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{
                        width: "70%",
                        border: "2px solid #757575",
                        borderRadius: "7px",
                      }}
                      placeholder="Please select the role"
                      onChange={handleChangeCreateTaskRole}
                      options={[
                        { label: "DAO Member", value: "dao_member" },
                        { label: "Assignee", value: "assignee" },
                      ]}
                    />
                  </Space>
                </div>
                <div className="perm_card11111">
                  <h2 style={{ width: "300px" }}>Choose Member</h2>
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{
                        width: "70%",
                        border: "2px solid #757575",
                        borderRadius: "7px",
                      }}
                      placeholder="Please select the Contributor"
                      onChange={handleChangeCreateTaskMembers}
                      options={[
                        { label: "Asad", value: "Asad" },
                        { label: "Asad", value: "Asad" },
                      ]}
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
                  <h2 style={{ width: "300px" }}>Select Role</h2>
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{
                        width: "70%",
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
                  <h2 style={{ width: "300px" }}>Choose Member</h2>
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{
                        width: "70%",
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
