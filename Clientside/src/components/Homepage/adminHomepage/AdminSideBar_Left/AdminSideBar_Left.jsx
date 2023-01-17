import React, { useState } from 'react';
import { Animation, Diversity3, FilterNone, FlutterDash, Mood, TheaterComedy,AccountCircle } from '@mui/icons-material';
import { useMovieContext } from '../../../../Context/Context';
import { useNavigate } from 'react-router-dom';
import AddMovie from './AddMovie/AddMovie';
import style from './style.module.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

const AdminSideBar_Left = () => {
  const { getGenre } = useMovieContext(); //variable to get the genre
  const [state, setState] = useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box sx={{ width: 250, backgroundColor:'#1a2a38', height:'100vh' }} role='presentation' >
      <div className={style.fixedContainerDrawer}>
        <div className={style.sorterDrawer}>
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
        <div className={style.admin}>
          <div className={style.topPart}>
            Admin
            <button onClick={logout} className={style.logout}>
              Logout
            </button>
          </div>
          <br />
          <AddMovie />
        </div>
      </div>
    </Box>
  );

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
        <div className={style.admin}>
          <div className={style.topPart}>
            Admin
            <button onClick={logout} className={style.logout}>
              Logout
            </button>
          </div>
          <br />
          <AddMovie />
        </div>
      </div>
      <Button  onClick={toggleDrawer('left', true)} sx={{ position: 'fixed', bottom: 10, left: 10, zIndex: '999', backgroundColor: 'white', color: '#1a2a38',display:{md:'none', xs:'flex'}, border:'1px solid', textShadow:'0.5px 0.5px 4px black' }} >
        <AccountCircle sx={{ color: '#1a2a38' }} />
        Profile
      </Button>
      <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
        {list('left')}
      </Drawer>
    </div>
  );
};

export default AdminSideBar_Left;
