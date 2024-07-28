import React, { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [countryList, setCountryList] = useState([]);
  const [filterCountryList, setFilterCountryList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        let response = await fetch('https://restcountries.com/v3.1/all');
        let data = await response.json();
        setCountryList(data);
        setFilterCountryList(data);  // Initialize the filterCountryList with the full data set
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountry();
  }, []);

  useEffect(() => {
    const filterCountry = () => {
      const newCountryList = countryList.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setFilterCountryList(newCountryList);
    };

    filterCountry();
  }, [search, countryList]);

  const renderCountryCards = (countries) => {
    return countries.map(country => (
      <div className='countryCard' key={country.name.common}>
        <img src={country.flags.png} alt={country.name.common} />
        <h2>{country.name.common}</h2>
      </div>
    ));
  };

  return (
    <>
      <div className='search-box'>
        <input
          type="text"
          placeholder='Search for countries...'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div className='container'>
        {renderCountryCards(search === "" ? countryList : filterCountryList)}
      </div>
    </>
  );
}

export default Home;
