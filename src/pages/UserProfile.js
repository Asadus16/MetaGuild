import React, { useState, useRef } from 'react';
import NavBar from '../Components/Navbar';
import './Pages.css';
import uploadIcon from '../images/user.svg';

export default function UserProfile() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    linkedin: '',
   
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken=JSON.parse(localStorage.getItem('authToken'))
    try {
      const response = await fetch('http://localhost:8000/users/me', {
        method: 'get',
      
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        
      });

      if (response.ok) {
        console.log('User profile updated successfully');
        const result = await response.json();
        console.log(result)
        // Handle success, e.g., show a success message to the user
      } else {
        console.error('Failed to update user profile');
        // Handle error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <NavBar />
      <div className="Settings_Page">
        <div className="settings_content">
          <div className="Dao_profile">
            <div className="profile_icon">
              <img
                src={uploadIcon}
                alt="Upload Icon"
                style={{ width: '200px', height: '200px', cursor: 'pointer', borderRadius: '50%' }}
              />
              <span style={{ display: 'block', marginTop: '5px', width: '200px' }}>Upload image</span>
            </div>
            <div className="profile_form">
              <form onSubmit={handleSubmit}>
                <h1>Please Enter your details</h1>
                <br />
                <br />
                <div>
                  <label htmlFor="Name">Name:</label>
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    className="user_field"
                    placeholder="Asad ullah"
                  />
                </div>
                <br /> <br />
                <div>
                  <label htmlFor="Description">ENS Address:</label>
                  <input
                    type="text"
                    id="Description"
                    name="Description"
                    value={formData.Description}
                    onChange={handleChange}
                    className="user_field"
                    placeholder="Asadullah.eth"
                  />
                </div>
                <br /> <br />
                <div>
                  <label htmlFor="LinkedIn">LinkedIn:</label>
                  <input
                    type="text"
                    id="LinkedIn"
                    name="LinkedIn"
                    value={formData.LinkedIn}
                    onChange={handleChange}
                    className="user_field"
                    placeholder="https://www.linkedin.com/in/asad-ullah-/"
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
