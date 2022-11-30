import React, { useEffect, useState } from 'react';
import { useMovieContext } from '../../../../../Context/Context';
import { useNavigate } from 'react-router-dom';
import AdminMovieCard from '../MovieCard/AdminMovieCard';
import NavBar from '../../../../theComponents/Navbar/NavBar';
import DeleteButton from './Buttons/DeleteButton';
import UpdateButton from './Buttons/UpdateButton';
import style from './style.module.css';

const AdminMovieCardSpecific = () => {
  const [state, setState] = useState([]); //variable for the details
  const { theCard, theUserId } = useMovieContext(); //global variable
  const [display, setDisplay] = useState('none'); // variable for the display style
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(`http://localhost:8000/movies?search=${theCard}`);
  }, []);

  const fetchData = async (url) => {
    const response = await fetch(url).then((res) => res.json());
    setState(response); // set the value of the details
  };

  useEffect(() => {
    if (state.authorId === theUserId) {
      setDisplay('flex'); // set value of the display
    }
  }, [state]);

  const back = () => {
    navigate('/adminHomepage'); // redirect to admin homepage
  };

  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.contentContainer}>
        <div className={style.content}>
          <AdminMovieCard details={state} />
          <section className={style.box}>
            <section className={style.theButtons}>
              <button className={style.button} onClick={back}>
                Back
              </button>
              <div className={style.adminButtons} style={{ display: `${display}` }}>
                <UpdateButton theTitle={state.title} details={state} />
                <DeleteButton theTitle={state.title} />
              </div>
            </section>
            <div className={style.boxDetails}>
              <h3>{state.title}</h3>
              <h3>
                Genre: <br /> {state.genre}
              </h3>
              <a target={'_blank'} href={`https://www.imdb.com/title/${state.imdbId}`}>
                <button className={style.button}>Learn More</button>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminMovieCardSpecific;
