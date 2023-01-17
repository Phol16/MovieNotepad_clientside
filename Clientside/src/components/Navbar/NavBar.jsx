import { Movie } from '@mui/icons-material';
import React from 'react';
import style from './style.module.css';

const NavBar = () => {
  return (
    <div className={style.logoContainer}>
      <p className={style.movienotepad}>
        <Movie /> MovieNotepad
      </p>
    </div>
  );
};

export default NavBar;
