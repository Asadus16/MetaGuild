import React from 'react';
import Logo from '../images/uniswap.png';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';
import NavBar from '../Components/Navbar';
import './Pages.css';
import Sidebar from '../Components/Sidebar/Sidebar';
import Boards from '../Components/BoardContainer/BoardContainer';
import KanbanBoard from '../Components/BoardContainer/KanbanBoard';

export default function Overview() {
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
              <img src={Logo} alt="Upload Icon" className="upload_icon" />
            </div>
            <div className="overview_title">
              <>
                <h1>Uniswap Protocol</h1>
              </>
              <div className="members">
                <h2 style={{ marginRight: '50px' }}>Members</h2>
                <div className="">
                  <Avatar.Group
                    maxCount={2}
                    maxStyle={{
                      color: '#f56a00',
                      backgroundColor: '#fde3cf',
                    }}
                  >
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                    <Avatar
                      style={{
                        backgroundColor: '#f56a00',
                      }}
                    >
                      K
                    </Avatar>
                    <Tooltip title="Ant User" placement="top">
                      <Avatar
                        style={{
                          backgroundColor: '#87d068',
                        }}
                        icon={<UserOutlined />}
                      />
                    </Tooltip>
                    <Avatar
                      style={{
                        backgroundColor: '#1677ff',
                      }}
                      icon={<AntDesignOutlined />}
                    />
                  </Avatar.Group>
                </div>
              </div>
            </div>
          </div>
          <div className="project_desc">
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium porro perferendis magnam beatae fuga numquam, facilis nulla voluptates
              praesentium delectus expedita repellendus ab nesciunt sed voluptate, velit aliquam laudantium dolores. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Accusantium porro perferendis magnam beatae fuga numquam, facilis nulla voluptates praesentium delectus expedita repellendus ab
              nesciunt sed voluptate, velit aliquam laudantium dolores.
            </h3>
          </div>
          <div className="footer_links">
            <>
              <a href="https://brand.linkedin.com/downloads" target="_blank" rel="noopener noreferrer" className="linkedIcon">
                <LinkedInIcon sx={{ fontSize: 40, color: 'white' }} />
              </a>
            </>
            <>
              <a href="https://www.flaticon.com/free-icons/public" target="_blank" rel="noopener noreferrer">
                <PublicIcon sx={{ fontSize: 40, color: 'white' }} />
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
