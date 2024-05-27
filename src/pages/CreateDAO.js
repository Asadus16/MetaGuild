import Navbar from "../Components/Navbar";
import React, { useState } from "react";
import Animation from "../json_animations/CreateAnimation.json";
import Lottie from "lottie-react";

export default function Create() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // const data = {
    //   name,
    //   description,
    // };

    const authToken = JSON.parse(localStorage.getItem("authToken"));

    // try {
    //   const response = await fetch('http://localhost:8000/dao', {
    //     method: 'POST',

    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${authToken}`
    //     },

    //   });

    //   if (response.ok) {
    //     console.log('DAO created successfully!');
    //     const result = await response.json();
    //     console.log(result)
    //     // Handle success, e.g., show a success message to the user
    //   } else {
    //     console.error('Failed to update user profile');
    //     // Handle error, e.g., show an error message to the user
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   // Handle error, e.g., show an error message to the user
    // }
  };

  const handleClick = () => {
    console.log("Button clicked");
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
        <Lottie
          animationData={Animation}
          className="submitBtn"
          type="submit"
          onClick={handleClick}
        />
      </div>
    </>
  );
}

// export default function Create() {  // Updated function name to match your route
//   const [daoName, setDaoName] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('DAO Name:', daoName);

//     const data = {
//       name: daoName,
//     };

//     try {
//       const response = await fetch('http://localhost:8000/daos', {  // Adjust the URL to your backend endpoint
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       setMessage('DAO created successfully!');
//       console.log('Success:', result);
//     } catch (error) {
//       setMessage(`Error: ${error.message}`);
//       console.error('Error:', error);
//     }
//   };
