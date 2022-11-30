import React from 'react';
import { Animation, Diversity3, FilterNone, FlutterDash, Mood, TextSnippet, TheaterComedy } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../../../../Context/Context';
import style from './style.module.css';

const UserSideBar_Left = () => {
  const { getGenre } = useMovieContext(); //variable to get the genre
  const navigate = useNavigate();

  const comedyGenre = () => {
    getGenre('comedy'); // set the value for genre as comedy
  };
  const animationGenre = () => {
    getGenre('animation'); // set the value for genre as animation
  };
  const dramaGenre = () => {
    getGenre('drama'); // set the value for genre as drama
  };
  const familyGenre = () => {
    getGenre('family'); // set the value for genre as family
  };
  const horrorGenre = () => {
    getGenre('horror'); // set the value for genre as horror
  };
  const allGenre = () => {
    getGenre('all'); // set the value for genre as all
  };

  const watchlist = () => {
    navigate('/userHomepage/Watchlist'); // redirect to watchlist page
  };

  const logout = () => {
    navigate('/'); // redirect back to loginpage
  };

  return (
    <div className={style.container}>
      <div className={style.fixedContainer}>
        <div className={style.sorter}>
          Genre:
          <button onClick={comedyGenre} className={style.button}>
            <Mood /> Comedy.{' '}
          </button>
          <button onClick={animationGenre} className={style.button}>
            <Animation /> Animation
          </button>
          <button onClick={dramaGenre} className={style.button}>
            <TheaterComedy />
            Drama
          </button>
          <button onClick={familyGenre} className={style.button}>
            <Diversity3 /> Family
          </button>
          <button onClick={horrorGenre} className={style.button}>
            <FlutterDash /> Horror
          </button>
          <button onClick={allGenre} className={style.button}>
            <FilterNone /> None
          </button>
        </div>
        <div className={style.user}>
          <div className={style.topPart}>
            User
            <button onClick={logout} className={style.logout}>
              Logout
            </button>
          </div>
          <br />
          <button onClick={watchlist} className={style.buttonWL}>
            <TextSnippet /> WatchList
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSideBar_Left;
