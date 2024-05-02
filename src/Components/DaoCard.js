import React from 'react';
import { Link } from 'react-router-dom';

const DaoCard = ({ logo, name, description, members }) => {
  return (
    <div className="dao-card">
      <Link to={'/explore/overview'} className="card-link">
        <img src={logo} alt={' Logo'} className="dao-logo" />
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
