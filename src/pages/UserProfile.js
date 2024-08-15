import React, { useState, useRef, useEffect } from 'react';
import NavBar from '../Components/Navbar';
import './Pages.css';
import uploadIcon from '../images/user.svg';
import { fetchMyself } from '../utils/fetchers';
import Alert from '@mui/material/Alert';

export default function UserProfile() {
  const authToken = localStorage.getItem('authToken');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    linkedin: '',
  });
  const [alertBar, setAlertBar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const profile = JSON.parse(localStorage.getItem("profile"));

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${formData.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name: formData.name,
          contract_address: formData.contract_address,
          ens_address: formData.ens_address,
          linkedin: formData.linkedin,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        window.location.reload();
        handleAlert();
      } else {
        console.error('Failed to update user profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchMyself(authToken).then((response) => setFormData({ ...response }));
  }, []);

  const handleAlert = () => {
    setAlertBar(true);
    const timeoutId = setTimeout(() => setAlertBar(false), 2000); // Set timeout for 3 seconds

    return () => clearTimeout(timeoutId); // Cleanup function for current timeout
  };

  return (
    <>
      <NavBar />
      <div className="Settings_Page">
        <div className="settings_content">
          {alertBar && (
            <Alert
              variant="filled"
              severity="success"
              style={{
                width: 'fit-content',
                marginLeft: 'auto',
                marginRight: '1rem',
              }}
            >
              User updated successfully.
            </Alert>
          )}

          <div className="Dao_profile">
            <div className="profile_icon">
              <img
                src={uploadIcon}
                alt="Upload Icon"
                style={{
                  width: '200px',
                  height: '200px',
                  cursor: 'pointer',
                  borderRadius: '50%',
                }}
              />
              <span style={{ display: 'block', marginTop: '5px', width: '200px', textAlign: 'center' }}>Upload image</span>
            </div>
            <div className="profile_form">
              <form onSubmit={handleSubmit}>
                <h1>Please Enter your details</h1>
                <br />
                <br />
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData?.name || ''}
                    onChange={handleChange}
                    className="user_field"
                    // placeholder="Asad ullah"
                  />
                </div>
                <br /> <br />
                <div>
                  <label htmlFor="ens_address">ENS Address:</label>
                  <input
                    type="text"
                    id="ens_address"
                    name="ens_address"
                    value={formData?.ens_address || ''}
                    onChange={handleChange}
                    className="user_field"
                    // placeholder="Asadullah.eth"
                  />
                </div>
                <br /> <br />
                <div>
                  <label htmlFor="linkedin">LinkedIn:</label>
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    value={formData?.linkedin || ''}
                    onChange={handleChange}
                    className="user_field"
                    // placeholder="https://www.linkedin.com/in/asad-ullah-/"
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
