import Navbar from '../Components/Navbar';
import React, { useState } from 'react';
import { daoData } from '../Components/mockData'; // Import mock data
import DaoCard from '../Components/DaoCard';

const SearchInput = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [searchText, setsearchText] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setsearchText(event.target.value);
  };

  return (
    <div className="search-container">
      {isEditing ? (
        <input type="text" value={searchText} onChange={handleChange} placeholder="Search DAOs..." />
      ) : (
        <div onClick={handleEditClick} style={{ cursor: 'text' }}>
          {searchText || 'Search DAOs...'} {/* Display placeholder if empty */}
        </div>
      )}
      <span className="edit-icon" onClick={handleEditClick}>
        x
      </span>
    </div>
  );
};

export default function Explore() {
  return (
    <>
      <Navbar />

      <div className="txtContainer">
        <div className="topTxt">
          <h1>Top DAOs ( 0 )</h1>
        </div>
        <p>Find hundreds of web3 DAOs, see their roadmap and explore open bounties and work</p>
      </div>

      <SearchInput />

      <div className="dao-cards">
        {daoData.map((dao) => (
          <DaoCard key={dao.id} logo={dao.logo} name={dao.name} description={dao.description} members={dao.members} />
        ))}
      </div>
    </>
  );
}
