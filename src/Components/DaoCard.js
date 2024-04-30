import React from 'react';

const DaoCard = ({ logo, name, description, members }) => {
  return (
    <div className="dao-card">
      <img src={logo} alt={ ' Logo'} className="dao-logo" />
      <div className="dao-info">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className="member-count">
        <span>{members}</span>
        <p>Members</p>
      </div>
    </div>
  );
};

export default DaoCard;
