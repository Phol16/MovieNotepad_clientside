import React, { useState, useEffect } from 'react';
import { useMovieContext } from '../../../../Context/Context';
import MovieCard from './MovieCard/AdminMovieCard';
import style from './style.module.css';

const AdminMainContent = () => {
  const [movieData, setMovieData] = useState([]); // variable for the movieData
  const { theGenre, theUpdate } = useMovieContext(); //global variables

  useEffect(() => {
    if (theGenre === 'comedy') {
      fetchData(`https://movienotepad-serverside.onrender.com/movies/${theGenre}`); //fetch data with comedy genre
    }
    if (theGenre === 'animation') {
      fetchData(`https://movienotepad-serverside.onrender.com/movies/${theGenre}`); //fetch data with animation genre
    }
    if (theGenre === 'drama') {
      fetchData(`https://movienotepad-serverside.onrender.com/movies/${theGenre}`); //fetch data with drama genre
    }
    if (theGenre === 'family') {
      fetchData(`https://movienotepad-serverside.onrender.com/movies/${theGenre}`); //fetch data with family genre
    }
    if (theGenre === 'horror') {
      fetchData(`https://movienotepad-serverside.onrender.com/movies/${theGenre}`); //fetch data with horror genre
    }
    if (theGenre === 'all') {
      fetchData(`https://movienotepad-serverside.onrender.com/movies`); //fetch all the data
    }
  }, [theGenre, theUpdate]);

  const fetchData = async (url) => {
    const response = await fetch(url).then((res) => res.json());
    if(response.error === `${theGenre} does not exist`){
      return
    }
    setMovieData(response); // set the value for the movieData
  };

  const displayCard = (e) => {
    return <MovieCard details={e} key={e._id} />;
  };

  return <div className={style.container}>{movieData.map(displayCard)}</div>;
};

export default AdminMainContent;
