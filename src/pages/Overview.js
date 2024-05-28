import React, { useEffect, useState } from "react";
import Logo from "../images/uniswap.png";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PublicIcon from "@mui/icons-material/Public";
import NavBar from "../Components/Navbar";
import "./Pages.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import Boards from "../Components/BoardContainer/BoardContainer";
import KanbanBoard from "../Components/BoardContainer/KanbanBoard";
import { getDao, getDaoMembers, getDaoTasks } from "../utils/fetchers";
import { useParams } from "react-router-dom";
import { capitalizeString } from "../utils/common";

export default function Overview() {
  const [daoData, setDaoData] = useState({});
  const [daoMembers, setDaoMembers] = useState({});
  const [daoTasks, setDaoTasks] = useState({});
  const { id } = useParams();

  async function fetchDao(id) {
    try {
      const dao = await getDao(id);
      setDaoData(dao);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchDaoMembers(daoId) {
    try {
      const daoMemberList = await getDaoMembers(daoId);
      setDaoMembers(daoMemberList);
      // setDaoData(dao);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchDaoTasks(daoId) {
    try {
      const daoTaskList = await getDaoTasks(daoId);
      setDaoMembers(daoTaskList);
      // setDaoData(dao);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDao(id);
    fetchDaoMembers(id);
    fetchDaoTasks(id);
  }, []);

  return (
    <>
      <NavBar />
      <div className="Overview_page">
        <div className="overview_sidebar">
          <Sidebar />
        </div>
        <div className="overview_content">
          <div className="titleBar">
            <div className="overview_icon">
              <img
                src={daoData.image || "/images/dao.svg"}
                alt="Upload Icon"
                className="upload_icon"
              />
            </div>
            <div className="overview_title">
              <>
                <h1>{daoData.name}</h1>
              </>
              <div className="members">
                <h2 style={{ marginRight: "50px" }}>Members</h2>
                <div className="">
                  <Avatar.Group
                    maxCount={2}
                    maxStyle={{
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                    }}
                  >
                    {daoMembers &&
                      Object.keys(daoMembers)?.map((member) => {
                        console.log(daoMembers[member].User.name);
                        return (
                          <Tooltip
                            title={capitalizeString(
                              daoMembers[member].User.name
                            )}
                            placement="top"
                            key={daoMembers[member].id}
                          >
                            {daoMembers[member].User.name ? (
                              <Avatar
                                style={
                                  daoMembers[member].User.name
                                    ? { backgroundColor: "#f56a00" }
                                    : { backgroundColor: "#000" }
                                }
                                src={
                                  daoMembers[member].User.name ||
                                  "https://api.dicebear.com/7.x/miniavs/svg?seed=2"
                                }
                              >
                                {daoMembers[member].User.name
                                  .charAt(0)
                                  .toUpperCase()}
                              </Avatar>
                            ) : (
                              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                            )}
                          </Tooltip>
                        );
                      })}
                    {/* <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                    <Tooltip title="Ant User" placement="top">
                      <Avatar
                        style={{
                          backgroundColor: "#f56a00",
                        }}
                      >
                        K
                      </Avatar>
                    </Tooltip>
                    <Tooltip title="Ant User" placement="top">
                      <Avatar
                        style={{
                          backgroundColor: "#87d068",
                        }}
                        icon={<UserOutlined />}
                      />
                    </Tooltip>
                    <Tooltip title="Ant User" placement="top">
                      <Avatar
                        style={{
                          backgroundColor: "#1677ff",
                        }}
                        icon={<AntDesignOutlined />}
                      />
                    </Tooltip> */}
                  </Avatar.Group>
                </div>
              </div>
            </div>
          </div>
          <div className="project_desc">
            <h3>{daoData.description}</h3>
          </div>
          <div className="footer_links">
            <>
              <a
                href={daoData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="linkedIcon"
              >
                <LinkedInIcon sx={{ fontSize: 40, color: "white" }} />
              </a>
            </>
            <>
              <a
                href={daoData.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PublicIcon sx={{ fontSize: 40, color: "white" }} />
              </a>
            </>
          </div>
          {/* <div className="page_content">
          <KanbanBoard />
        </div> */}
        </div>
      </div>
    </>
  );
}
