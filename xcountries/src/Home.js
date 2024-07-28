import React, { useEffect, useState } from 'react';
import './Home.css';

function Home() {

    const [countryList, setCountryList] = useState([]);
    const [filterCountryList, setFilterCountryList] = useState([]);
    const [search, setSearch] = useState('');



    const filterCountry = () => {

        const newCountryList = countryList.filter( country => country.name.common.toLowerCase().includes(search.toLowerCase()));
        setFilterCountryList(newCountryList);
    }

    const fetchCountry = async() => {
        try {

            let response = await fetch('https://restcountries.com/v3.1/all');
            let data = await response.json();
            setCountryList(data);
            // console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchCountry();
    },[]);
    useEffect(()=>{
        filterCountry();
    },[search]);

  return (
    <>
    <div className='search-box'>
        <input type="text" placeholder='Search for countries...' onChange={(e)=>setSearch(e.target.value)} value={search}/>
    </div>
    <div className='container'>

        {search === "" ? countryList.map(
            (country)=>{
                return (
                    <div className='countryCard' key={country.name.common}>
                        <img src={country.flags.png} alt={country.name.common} />
                        <h3>{country.name.common}</h3>
                    </div>
                )
            }
        ) :  filterCountryList.map(
            (country)=>{
                return (
                    <div className='countryCard' key={country.name.common}>
                        <img src={country.flags.png} alt={country.name.common} />
                        <h3>{country.name.common}</h3>
                    </div>
                )
            }
        )}
        
    </div>
    </>
  )
}

export default Home