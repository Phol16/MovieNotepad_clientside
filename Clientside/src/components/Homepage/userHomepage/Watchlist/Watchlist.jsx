import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../../../../Context/Context';
import NavBar from '../../../theComponents/Navbar/NavBar';
import WatchlistCard from './WatchlistCard/WatchlistCard';
import style from './style.module.css';

const Watchlist = () => {
  const [watchList, setWatchList] = useState([]); // variable for watchlist data
  const { theUserId } = useMovieContext(); // global variable

  const navigate = useNavigate();

  useEffect(() => {
    fetchData('http://localhost:8000/user/watchlist');
  }, []);

  const fetchData = async (url) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-usersid': `${theUserId}`,
      },
    }).then((res) => res.json());

    //condition statement if fetch response in unkown user Id
    if (response.error === 'unkown UserId') {
      return;
    }
    setWatchList(response); // set the value to watchlist data
  };

  const displayCard = (e) => {
    return <WatchlistCard details={e} key={e._id} />;
  };

  const back = () => {
    navigate('/userHomepage'); // redirect to user homepage
  };

  return (
    <div className={style.container}>
      <section className={style.topContainer}>
        <NavBar />
      </section>
      <section className={style.subContainer}>
        <button onClick={back} className={style.back}>
          Back
        </button>
        <div className={style.boxCard}>
          <h2 className={style.textWL}>WatchList</h2>
          <section className={style.card}>{watchList.map(displayCard)}</section>
        </div>
      </section>
    </div>
  );
};

export default Watchlist;
