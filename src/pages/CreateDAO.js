import Navbar from '../Components/Navbar';
import React, { useState } from 'react';
import Animation from '../json_animations/CreateAnimation.json';
import Lottie from 'lottie-react';
import { createDao } from '../utils/fetchers';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

export default function Create() {
<<<<<<< HEAD
  const authToken = localStorage.getItem('authToken');
=======
  const authToken = localStorage.getItem("authToken");
  const userProfile = JSON.parse(localStorage.getItem("profile"));
>>>>>>> 36528bb494c0bf86d8454bb9b18e4a30a29b0a7a
  const navigate = useNavigate();
  const [newDao, setNewDao] = useState({ name: '', description: '' });
  const [alertBar, setAlertBar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("false");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDao({ ...newDao, [name]: value });
  };

  async function createNewDao(authToken, daoData) {
    try {
      const dao = await createDao(authToken, daoData);
      if (dao) {
        navigate('/explore');
      } else {
<<<<<<< HEAD
        handleAlert();
        setNewDao({ name: '', description: '' });
=======
        handleAlert("Unauthorized to create DAO");
        setNewDao({ name: "", description: "" });
>>>>>>> 36528bb494c0bf86d8454bb9b18e4a30a29b0a7a
      }
    } catch (error) {
      console.log('error');
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userProfile || !userProfile.email_address) {
      console.log("no email addr");
      handleAlert("Please update Email Address in your profile");
    } else {
      createNewDao(authToken, newDao);
    }
  };

  const handleAlert = (message) => {
    setAlertBar(true);
    setAlertMessage(message);
    const timeoutId = setTimeout(() => setAlertBar(false), 2000); // Set timeout for 3 seconds

    return () => clearTimeout(timeoutId); // Cleanup function for current timeout
  };

  return (
    <>
      <Navbar />

      <div className="container">
        {alertBar && (
          <Alert
            variant="filled"
            severity="error"
            style={{
              width: 'fit-content',
              marginLeft: 'auto',
              marginRight: '1rem',
            }}
          >
            {alertMessage}
          </Alert>
        )}

        <h1>Create DAO</h1>
        <form onSubmit={handleSubmit}>
          <div className="firstfield">
            <label htmlFor="name">Enter the name for your DAO</label>
            <br />
            <input className="field1" type="text" id="name" name="name" placeholder="Enter your DAO name" value={newDao.name} onChange={handleChange} />
          </div>
          <div className="secondfield">
            <label htmlFor="description">Enter a description for your DAO</label>
            <br />

            <input
              className="field2"
              type="text"
              id="description"
              name="description"
              placeholder="What services will your DAO provide"
              value={newDao.description}
              onChange={handleChange}
            />
          </div>

          <div className="submitBtnContainer">
            <button type="submit" style={{ background: 'transparent', border: 'none' }}>
              <Lottie animationData={Animation} className="submitBtn" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
