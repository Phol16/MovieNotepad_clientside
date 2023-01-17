import React, { useState, useEffect } from 'react';
import { useMovieContext } from '../../../../../Context/Context';
import { useNavigate } from 'react-router-dom';
import UserMovieCard from '../MovieCard/UserMovieCard';
import NavBar from '../../../../Navbar/NavBar';
import style from './style.module.css';
import { Add } from '@mui/icons-material';

const UserMovieCardSpecific = () => {
  const [disable, setDisable] = useState(false); // variable for the disable style
  const [movieDetails, setMovieDetails] = useState([]); //variable for the movie details
  const { theCard, theUserId } = useMovieContext(); //global variable
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(`https://movienotepad-serverside.onrender.com/movies?search=${theCard}`);
  }, []);

  const fetchData = async (url) => {
    const response = await fetch(url).then((res) => res.json());
    setMovieDetails(response); // set the value of the  movie details
  };

  const addWL = async () => {
    await fetch(`https://movienotepad-serverside.onrender.com/user/movies/${theCard}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-usersid': `${theUserId}`,
      },
      body: JSON.stringify(),
    });

    setDisable(true); // set the value of disable to true
  };

  const back = () => {
    navigate('/userHomepage'); // redirect to user homepage
  };

  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.contentContainer}>
        <div className={style.content}>
          <UserMovieCard details={movieDetails} />
          <section className={style.box}>
            <section className={style.theButtons}>
              <button className={style.button} onClick={back}>
                Back
              </button>
              <button className={style.addWL} onClick={addWL} disabled={disable}>
                <Add /> Add to Watchlist
              </button>
            </section>
            <div className={style.boxDetails}>
              <h3>{movieDetails.title}</h3>
              <h3>
                Genre: <br /> {movieDetails.genre}
              </h3>
              <a target={'_blank'} href={`https://www.imdb.com/title/${movieDetails.imdbId}`}>
                <button className={style.button}>Learn More</button>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserMovieCardSpecific;
