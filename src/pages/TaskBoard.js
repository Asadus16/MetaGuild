import NavBar from "../Components/Navbar";
import "./Pages.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import Boards from "../Components/BoardContainer/BoardContainer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDaoTasks, getDaoUser, getUserTasks } from "../utils/fetchers";

export default function TaskBoard() {
  const { id } = useParams();
  const [daoTasks, setDaoTasks] = useState({});
  const authToken = localStorage.getItem("authToken");
  const [userTasks, setUserTasks] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  async function fetchDaoUser(authToken, daoId) {
    try {
      const daoUser = await getDaoUser(authToken, daoId);

      if (daoUser.role === "admin") {
        setIsAdmin(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchDaoTasks(daoId) {
    try {
      const daoTaskList = await getDaoTasks(daoId);
      setDaoTasks(daoTaskList);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUserTasks(authToken) {
    try {
      const userTaskList = await getUserTasks(authToken);

      setUserTasks(userTaskList.map((task) => task.task_id));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDaoUser(authToken, id);
    fetchDaoTasks(id);
    fetchUserTasks(authToken);
  }, []);

  return (
    <>
      <NavBar />
      <div className=" Taskboard_page page">
        <div
          className={`taskBoard_sidebar ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
        <div className=" Taskpage_content">
          <Boards isAdmin={isAdmin} tasks={daoTasks} userTasks={userTasks} />
        </div>
      </div>
    </>
  );
}
