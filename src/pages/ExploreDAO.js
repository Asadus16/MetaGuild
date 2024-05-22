import Navbar from '../Components/Navbar';
import React, { useState, useEffect } from 'react';
import DaoCard from '../Components/DaoCard';

const SearchInput = ({ searchText, setSearchText }) => {
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
  const [daoData, setDaoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/daos'); // Adjust the URL to your backend endpoint
        // console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data
        setDaoData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredData = Array.isArray(daoData) ? daoData.filter(dao =>
    dao.name.toLowerCase().includes(searchText.toLowerCase())
  ) : [];

  return (
    <>
      <Navbar />

      <div className="txtContainer">
        <div className="topTxt">
          <h1>Top DAOs ( {filteredData.length} )</h1>
        </div>
        <p>Find hundreds of web3 DAOs, see their roadmap and explore open bounties and work</p>
      </div>

      <SearchInput searchText={searchText} setSearchText={setSearchText} />

      <div className="dao-cards">
        {filteredData.map((dao) => (
          <DaoCard
            key={dao.id}
            logo={dao.logo}
            name={dao.name}
            description={dao.description}
            members={dao.members}
          />
        ))}
      </div>
    </>
  );
}
