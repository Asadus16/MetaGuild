import Navbar from '../Components/Navbar';
import React, { useState } from 'react';
import Animation from '../json_animations/CreateAnimation.json';
import Lottie from 'lottie-react';

export default function Create() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    // You can add code here to store the information wherever you need
  };
  const handleClick = () => {
    console.log('Button clicked');
    // You can add additional functionality here
  };
  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Create DAO</h1>
        <form onSubmit={handleSubmit}>
          <div className="firstfield">
            <label htmlFor="firstName">Enter the name for your DAO</label>
            <br />
            <input
              className="field1"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your DAO name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="secondfield">
            <label htmlFor="lastName">Enter a description for your DAO</label>
            <br />

            <input
              className="field2"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="What services will your DAO provide"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="submitBtnContainer">
        <Lottie animationData={Animation} className="submitBtn" type="submit" onClick={handleClick} />
      </div>
    </>
  );
}
