import NavBar from '../Components/Navbar';
import './Pages.css';
import Sidebar from '../Components/Sidebar/Sidebar';
import { Link, useParams } from 'react-router-dom';
import uploadIcon from '../images/user.svg';
import React, { useState, useRef, useEffect } from 'react';
import SettingsTab from '../Components/SettingsTab';
import { getDao, updateDao } from '../utils/fetchers';

export default function DaoSettings() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const authToken = localStorage.getItem('authToken');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    linkedin: '',
    website: '',
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  async function fetchDao(id) {
    try {
      const dao = await getDao(id);
      setFormData({ ...dao });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateMyDao(authToken, daoId, daoData) {
    try {
      const dao = await updateDao(authToken, daoId, daoData);
      if (dao) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDao(id);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // Do something with the uploaded image file, such as displaying it or saving it to state
    setImage(file);
  };

  const handleUploadIconClick = () => {
    // Trigger the file upload input
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateMyDao(authToken, id, formData);
  };

  return (
    <>
      <NavBar />
      <div className="Settings_Page">
        <div className={`settings_sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        <div className="settings_content">
          <div className="">
            <SettingsTab />
          </div>
          <div className="Dao_profile">
            <>
              <div className="profile_icon">
                {/* Hidden file upload input */}
                <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} style={{ display: 'none' }} />

                {/* Conditional rendering: display uploaded image if available, otherwise display upload icon */}
                {image ? (
                  <div className="img_center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded Image"
                      className="uploaded_img"
                      style={{
                        width: '200px',
                        height: '200px',
                        cursor: 'pointer',
                        marginTop: '50px',
                        borderRadius: '50%',
                      }}
                      onClick={handleUploadIconClick} // Trigger file input click when image is clicked
                    />
                    <span
                      style={{
                        display: 'block',
                        marginTop: '5px',
                        width: '200px',
                        textAlign: 'center',
                      }}
                    >
                      Click to change image
                    </span>
                  </div>
                ) : (
                  <div className="image_div">
                    <img
                      src={uploadIcon}
                      alt="Upload Icon"
                      className="upload_icon"
                      onClick={handleUploadIconClick}
                      style={{
                        width: '200px',
                        height: '200px',
                        cursor: 'pointer',
                        borderRadius: '50%',
                      }}
                    />
                    <span
                      style={{
                        display: 'block',
                        marginTop: '5px',
                        width: '200px',
                      }}
                    >
                      Upload image
                    </span>
                  </div>
                )}
              </div>
            </>
            <div className="profile_form">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="Name">Name:</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="dao_field" />
                </div>
                <br /> <br />
                <div>
                  <label htmlFor="Description">Description:</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="dao_field"
                    placeholder="Built on top of the Ethereum blockchain, the Ocean protocol uses ..."
                  />
                </div>
                <br /> <br />
                <div>
                  <label htmlFor="Linkedin">Linkedin:</label>
                  <input type="text" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} className="dao_field" />
                </div>
                <br /> <br />
                <div>
                  <label htmlFor="website">Website:</label>
                  <input type="text" id="website" name="website" value={formData.website} onChange={handleChange} className="dao_field" />
                </div>
                <br /> <br />
                <button type="submit" className="profile_submit">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
