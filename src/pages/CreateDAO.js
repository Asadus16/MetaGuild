import Navbar from '../Components/Navbar';
import React, { useState } from 'react';
import Animation from '../json_animations/CreateAnimation.json';
import Lottie from 'lottie-react';
import { createDao } from '../utils/fetchers';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [newDao, setNewDao] = useState({ name: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDao({ ...newDao, [name]: value });
  };

  async function createNewDao(authToken, daoData) {
    try {
      const dao = await createDao(authToken, daoData);
      if (dao) {
        navigate('/explore');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    createNewDao(authToken, newDao);
  };

  return (
    <>
      <Navbar />
      <div className="container">
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
