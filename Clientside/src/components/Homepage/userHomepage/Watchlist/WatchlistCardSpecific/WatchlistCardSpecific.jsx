import { Delete } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../../../../../Context/Context';
import NavBar from '../../../../Navbar/NavBar';
import WatchlistCard from '../WatchlistCard/WatchlistCard';
import DeleteWL from './Delete/DeleteWL';
import style from './style.module.css';

const WatchlistCardSpecific = () => {
  const [movieData, setMovieData] = useState([]);
  const { theCard } = useMovieContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(`https://movienotepad-serverside.onrender.com/movies?search=${theCard}`);
  }, []);

  const fetchData = async (url) => {
    const response = await fetch(url).then((res) => res.json());
    setMovieData(response); // set the value of the movie details
  };

  const back = () => {
    return navigate('/userHomepage/Watchlist'); // redirect to watchlist
  };

  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.contentContainer}>
        <div className={style.content}>
          <WatchlistCard details={movieData} />
          <section className={style.box}>
            <section className={style.theButtons}>
              <button className={style.button} onClick={back}>
                Back
              </button>
              <DeleteWL theTitle={movieData.title} />
            </section>
            <div className={style.boxDetails}>
              <h3>{movieData.title}</h3>
              <h3>
                Genre: <br /> {movieData.genre}
              </h3>
              <a target={'_blank'} href={`https://www.imdb.com/title/${movieData.imdbId}`}>
                <button className={style.button}>Learn More</button>
              </a>
            </div>
            <br />
            <label>
              <h3>Notes</h3>
            </label>
            <input type="text" />
          </section>
        </div>
      </div>
    </div>
  );
};

export default WatchlistCardSpecific;
