import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./pages/CreateDAO";
import Explore from "./pages/ExploreDAO";
import NoPage from "./pages/NoPage";
import "./App.css";
import Overview from "./pages/Overview";
import TaskBoard from "./pages/TaskBoard";
import DaoSettings from "./pages/Settings";
import SettingPerm from "./pages/SettingsPermissions";
import Manage from "./pages/SettingsManage";
import UserProfile from "./pages/UserProfile";
import ScrollToTop from "./Components/ScrollToTop";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/overview/:id" element={<Overview />} />
          <Route
            path="/explore/:id/settings/profile"
            element={<DaoSettings />}
          />
          <Route
            path="/explore/:id/settings/permissions"
            element={<SettingPerm />}
          />
          <Route path="/explore/:id/settings/manage" element={<Manage />} />
          <Route path="/userprofile" element={<UserProfile />} />

          <Route path="/explore/:id/tasks" element={<TaskBoard />} />
          {/* <Route path="/explore/taskbar" element={<TaskBoard />} /> */}

          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
