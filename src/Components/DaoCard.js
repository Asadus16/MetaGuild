import React from "react";
import { Link } from "react-router-dom";

const DaoCard = ({ id, logo, name, description, members }) => {
  return (
    <div className="dao-card">
      <Link to={"/explore/overview/" + id} className="card-link">
        <img
          src={logo || "/images/dao.svg"}
          alt="logo"
          className="dao-logo"
          style={{ background: "#fff" }}
        />
        <div className="dao-info">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </Link>
      <div className="member-count">
        <span>{members}</span>
        <p>Members</p>
      </div>
    </div>
  );
};

export default DaoCard;
