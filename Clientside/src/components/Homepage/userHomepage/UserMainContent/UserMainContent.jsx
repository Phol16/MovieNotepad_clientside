import React, { useState, useEffect } from 'react';
import { useMovieContext } from '../../../../Context/Context';
import MovieCard from './MovieCard/UserMovieCard';
import style from './style.module.css';

const UserMainContent = () => {
  const [movieData, setMovieData] = useState([]); // variable for the movieData
  const { theGenre, theUpdate } = useMovieContext(); //global variables

  useEffect(() => {
    if (theGenre === 'comedy') {
      fetchData(`http://localhost:8000/movies/${theGenre}`); //fetch data with comedy genre
    }
    if (theGenre === 'animation') {
      fetchData(`http://localhost:8000/movies/${theGenre}`); //fetch data with animation genre
    }
    if (theGenre === 'drama') {
      fetchData(`http://localhost:8000/movies/${theGenre}`); //fetch data with drama genre
    }
    if (theGenre === 'family') {
      fetchData(`http://localhost:8000/movies/${theGenre}`); //fetch data with family genre
    }
    if (theGenre === 'horror') {
      fetchData(`http://localhost:8000/movies/${theGenre}`); //fetch data with horror genre
    }
    if (theGenre === 'all') {
      fetchData(`http://localhost:8000/movies`); //fetch all the data
    }
  }, [theGenre, theUpdate]);

  const fetchData = async (url) => {
    const response = await fetch(url).then((res) => res.json());
    setMovieData(response); // set the value for the movieData
  };

  const displayCard = (e) => {
    return <MovieCard details={e} key={e._id} />;
  };

  return <div className={style.container}>{movieData.map(displayCard)}</div>;
};

export default UserMainContent;
