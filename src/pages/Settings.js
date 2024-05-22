import NavBar from '../Components/Navbar';
import './Pages.css';
import Sidebar from '../Components/Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import uploadIcon from '../images/user.svg';
import React, { useState, useRef } from 'react';
import SettingsTab from '../Components/SettingsTab';

export default function DaoSettings() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // Do something with the uploaded image file, such as displaying it or saving it to state
    setImage(file);
  };

  const handleUploadIconClick = () => {
    // Trigger the file upload input
    fileInputRef.current.click();
  };

  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    LinkedIn: '',
    Website: '',
  });


  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can replace this with your storage logic
  };

  return (
    <>
      <NavBar />
      <div className="Settings_Page">
        <div className="settings_sidebar">
          <Sidebar />
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
                      style={{ width: '200px', height: '200px', cursor: 'pointer', marginTop: '50px', borderRadius: '50%' }}
                      onClick={handleUploadIconClick} // Trigger file input click when image is clicked
                    />
                    <span style={{ display: 'block', marginTop: '5px', width: '200px', textAlign: 'center' }}>Click to change image</span>
                  </div>
                ) : (
                  <div className="image_div">
                    <img
                      src={uploadIcon}
                      alt="Upload Icon"
                      className="upload_icon"
                      onClick={handleUploadIconClick}
                      style={{ width: '200px', height: '200px', cursor: 'pointer', borderRadius: '50%' }}
                    />
                    <span style={{ display: 'block', marginTop: '5px', width: '200px' }}>Upload image</span>
                  </div>
                )}
              </div>
            </>
            <div className="profile_form">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="Name">Name:</label>
                  <input type="text" id="Name" name="Name" value={formData.field1} onChange={handleChange} className="dao_field" placeholder="Ocean Protocol" />
                </div>
                <br /> <br />
                <div>
                  <label htmlFor="Description">Description:</label>
                  <input
                    type="text"
                    id="Description"
                    name="Description"
                    value={formData.field2}
                    onChange={handleChange}
                    className="dao_field"
                    placeholder="Built on top of the Ethereum blockchain, the Ocean protocol uses ..."
                  />
                </div>
                <br /> <br />
                <div>
                  <label htmlFor="LinkedIn">LinkedIn:</label>
                  <input
                    type="text"
                    id="LinkedIn"
                    name="LinkedIn"
                    value={formData.field3}
                    onChange={handleChange}
                    className="dao_field"
                    placeholder="linkedin.com/company/ocean-protocol"
                  />
                </div>
                <br /> <br />
                <div>
                  <label htmlFor="Website">Website:</label>
                  <input
                    type="text"
                    id="Website"
                    name="Website"
                    value={formData.field4}
                    onChange={handleChange}
                    className="dao_field"
                    placeholder="https://oceanprotocol.com/"
                  />
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
