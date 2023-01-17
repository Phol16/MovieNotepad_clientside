import React from 'react';
import NavBar from '../../Navbar/NavBar';
import AdminMainContent from './AdminMainContent/AdminMainContent';
import AdminSideBar_Left from './AdminSideBar_Left/AdminSideBar_Left';
import AdminSideBar_Right from './AdminSideBar_Right/AdminSideBar_Right';
import style from './style.module.css';

const AdminHomepage = () => {
  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.contentContainer}>
        <AdminSideBar_Left />
        <AdminMainContent />
        <AdminSideBar_Right />
      </div>
    </div>
  );
};

export default AdminHomepage;
