import Navbar from '../Components/Navbar';
import React, { useState, useEffect } from 'react';
import DaoCard from '../Components/DaoCard';
import { getDaos } from '../utils/fetchers';

const SearchInput = ({ searchText, setSearchText }) => {
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const clearSearchText = () => {
    setSearchText('');
  };

  return (
    <div className="search-container">
      <input type="text" value={searchText} onChange={handleChange} placeholder="Search DAOs..." />
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/daos', {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }); // Adjust the URL to your backend endpoint
        // console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDaoData(data.daos);
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

  const filteredData = Array.isArray(daoData) ? daoData.filter((dao) => dao.name.toLowerCase().includes(searchText.toLowerCase())) : [];

  return (
    <>
      <Navbar />

      <div className="txtContainer">
        <div className="topTxt">
          <h1>Top DAOs ( {daoData.length} )</h1>
        </div>
        <p style={{ textAlign: 'center' }}>Find hundreds of web3 DAOs, see their roadmap and explore open bounties and work</p>
      </div>

      <SearchInput searchText={searchText} setSearchText={setSearchText} />

      <div className="dao-cards">
        {daoData &&
          daoData?.map((dao) => (
            <DaoCard
              key={dao.id}
              id={dao.id}
              logo={dao.image}
              name={dao.name}
              description={dao.description}
              // members={dao.members}
            />
          ))}
      </div>
    </>
  );
}
