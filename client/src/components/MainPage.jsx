import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchForm from './SearchForm';
import childComponent from './childComponent'; 
import Row from 'react-bootstrap/Row';


const MainPageemplate = () => {
  const [search, setSearch] = useState('someBeatleSong');
  const [apiData, setApiData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    // Take the value of the input box.
    console.log(event.target.elements.searchbar.value);
    // reminder: setSearch is the only way to change the search value.
    setSearch(event.target.elements.searchbar.value);
  };

  // This code only kicks in if "search" ever changes value.
  useEffect(() => {
    console.log('useEffect?');
    const fetchData = async () => {
      let response = await axios.get(
        `http://www.songsterr.com/a/ra/songs/byartists.json?artists=Beatles,${search} ` //need to confirm this api
      );
      // Save the fetch data into the apiData state var
      setApiData(response.data);
    };
    fetchData();
  }, [search]);

  return (
    <>
      <SearchForm handleSubmitProp={handleSubmit} />
      <Row>
        {apiData.songs &&
          apiData.songs.map((songs) => {
            console.log(songs);
            return (
              <Recipe
                key={songs.idSongs}
                id={songs.idSongs}
                image={songs.strMealThumb}
                name={meal.strMeal}
              />
            );
          })}
      </Row>
    </>
  );
};

export default MainPage;
