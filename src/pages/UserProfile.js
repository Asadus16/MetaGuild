import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import NavBar from "../Components/Navbar";
import "./Pages.css";
import uploadIcon from "../images/user.svg";
import { fetchMyself } from "../utils/fetchers";
import Alert from "@mui/material/Alert";

export default function UserProfile() {
  const authToken = localStorage.getItem("authToken");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email_address: "",
    linkedin: "",
  });
  const [alertBar, setAlertBar] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${formData.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            name: formData.name,
            contract_address: formData.contract_address,
            ens_address: formData.ens_address,
            email_address: formData.email_address,
            linkedin: formData.linkedin,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        // window.location.reload();
        handleAlert();
      } else {
        console.error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error:", error);
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
    const timeoutId = setTimeout(() => setAlertBar(false), 2000);

    return () => clearTimeout(timeoutId);
  };

  const handleClose = () => {
    navigate("/"); // Redirect to the homepage
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
                width: "fit-content",
                marginLeft: "auto",
                marginRight: "1rem",
              }}
            >
              User updated successfully.
            </Alert>
          )}

          <div className="Dao_profile">
            <div className="profile_icon">
              <img src={uploadIcon} alt="Upload Icon" className="profIcon" />
              <span className="spanTxt">Upload image</span>
            </div>
            <div className="profile_form">
              <form className="forms" onSubmit={handleSubmit}>
                <h1>Please Enter your details</h1>
                <br />
                <br />
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData?.name || ""}
                    onChange={handleChange}
                    className="user_field"
                  />
                </div>
                <br />
                <br />
                <div>
                  <label htmlFor="ens_address">ENS Address:</label>
                  <input
                    type="text"
                    id="ens_address"
                    name="ens_address"
                    value={formData?.ens_address || ""}
                    onChange={handleChange}
                    className="user_field"
                  />
                </div>
                <br />
                <br />
                <div>
                  <label htmlFor="email_address">Email Address:</label>
                  <input
                    type="text"
                    id="email_address"
                    name="email_address"
                    value={formData?.email_address || ""}
                    onChange={handleChange}
                    className="user_field"
                  />
                </div>
                <br />
                <br />
                <div>
                  <label htmlFor="linkedin">LinkedIn:</label>
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    value={formData?.linkedin || ""}
                    onChange={handleChange}
                    className="user_field"
                  />
                </div>
                <br />
                <br />
                <div className="profbtn">
                  <button type="submit" className="profile_submit">
                    Save
                  </button>
                  <br />
                  <button
                    type="button"
                    className="profile_submit"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
