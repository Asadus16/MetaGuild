import Navbar from '../Components/Navbar';
import React, { useState } from 'react';
import { daoData } from '../Components/mockData'; // Import mock data
import DaoCard from '../Components/DaoCard';

const SearchInput = () => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const clearSearchText = () => {
    setSearchText('');
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        value={searchText} 
        onChange={handleChange} 
        placeholder="Search DAOs..."
      />
      {searchText && (
         <span className="edit-icon" onClick={clearSearchText}>
          x
        </span>
      )}
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
