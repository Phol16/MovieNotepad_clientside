import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MovieProvider } from './Context/Context';
import Login from './components/LoginPage/Login';
import AdminHomepage from './components/Homepage/adminHomepage/AdminHomepage';
import UserHomepage from './components/Homepage/userHomepage/UserHomepage';
import AdminMovieCardSpecific from './components/Homepage/adminHomepage/AdminMainContent/MovieCardSpecific/AdminMovieCardSpecific';
import UserMovieCardSpecific from './components/Homepage/userHomepage/UserMainContent/MovieCardSpecific/UserMovieCardSpecific';
import Watchlist from './components/Homepage/userHomepage/Watchlist/Watchlist';
import WatchlistCardSpecific from './components/Homepage/userHomepage/Watchlist/WatchlistCardSpecific/WatchlistCardSpecific';

function App() {
  return (
    <div className="App">
      <MovieProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/adminHomepage" element={<AdminHomepage />} />
          <Route path="/adminHomepage/Movie" element={<AdminMovieCardSpecific />} />
          <Route path="/userHomepage" element={<UserHomepage />} />
          <Route path="/userHomepage/Movie" element={<UserMovieCardSpecific />} />
          <Route path="/userHomepage/Watchlist" element={<Watchlist />} />
          <Route path="/userHomepage/Watchlist/Movie" element={<WatchlistCardSpecific />} />
        </Routes>
      </MovieProvider>
    </div>
  );
}

export default App;
