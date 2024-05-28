import NavBar from "../Components/Navbar";
import "./Pages.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import Boards from "../Components/BoardContainer/BoardContainer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDaoTasks } from "../utils/fetchers";

export default function TaskBoard() {
  const { id } = useParams();
  const [daoTasks, setDaoTasks] = useState({});

  async function fetchDaoTasks(daoId) {
    try {
      const daoTaskList = await getDaoTasks(daoId);
      setDaoTasks(daoTaskList);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDaoTasks(id);
  }, []);

  return (
    <>
      <NavBar />
      <div className=" Taskboard_page">
        <div className=" taskBoard_sidebar">
          <Sidebar />
        </div>
        <div className=" Taskpage_content">
          <Boards tasks={daoTasks} />
        </div>
      </div>
    </>
  );
}
