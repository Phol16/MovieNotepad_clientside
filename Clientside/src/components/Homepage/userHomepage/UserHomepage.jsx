import React from 'react';
import UserMainContent from './UserMainContent/UserMainContent';
import UserSideBar_Left from './UserSideBar_Left/UserSideBar_Left';
import UserSideBar_Right from './UserSideBar_Right/UserSideBar_Right';
import style from './style.module.css';
import NavBar from '../../theComponents/Navbar/NavBar';

const UserHomepage = () => {
  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.contentContainer}>
        <UserSideBar_Left />
        <UserMainContent />
        <UserSideBar_Right />
      </div>
    </div>
  );
};

export default UserHomepage;
