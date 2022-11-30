import React, { useState } from 'react';
import { useMovieContext } from '../../../../../Context/Context';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import style from './style.module.css';

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  color: 'black',
  border: '2px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

const AddMovie = () => {
  const [open, setOpen] = useState(false); // variable for the open/close value
  const [movieData, setMovieData] = useState({}); // variable for movie data
  const { getUpdate, theUserId } = useMovieContext(); // global variables

  const handleOpen = () => setOpen(true); // set the value to true/open
  const handleClose = () => setOpen(false); // set the value to false/close

  //values of ...
  let title = '';
  let imdbId = '';
  let genre = [];
  let posterURL = '';

  const theValue = (e) => {
    setMovieData({ title: title.value, imdbId: imdbId.value, genre: [genre.value], posterURL: posterURL.value }); //set the value of ...
  };

  const theMovie = async (e) => {
    e.preventDefault(); // to prevent from refreshing the page after submitting

    // submitting data to the DB
    await fetch('http://localhost:8000/adminUser/movies', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-usersid': `${theUserId}`,
      },
      body: JSON.stringify(movieData),
    });

    getUpdate(movieData.title); // set the value of the update
    handleClose(); // to close the modal
  };

  return (
    <div>
      <button onClick={handleOpen} className={style.addMovie}>
        Add Movie
      </button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={boxStyle}>
          <form onSubmit={theMovie}>
            <label htmlFor="title">
              Title:
              <br />
              <input type="text" id="title" name="title" placeholder="Title" onChange={theValue} ref={(e) => (title = e)} />
            </label>
            <br />
            <label htmlFor="imdbId">
              Imdb Id:
              <br />
              <input type="text" id="imdbId" name="imdbId" placeholder="Imdb Id" onChange={theValue} ref={(e) => (imdbId = e)} />
            </label>
            <br />
            <label htmlFor="genre">
              Genre:
              <br />
              <input type="text" id="genre" name="genre" placeholder="Genre" onChange={theValue} ref={(e) => (genre = e)} />
            </label>
            <br />
            <label htmlFor="posterURL">
              PosterUrl:
              <br />
              <input type="text" id="posterURL" name="posterURL" placeholder="PosterURL" onChange={theValue} ref={(e) => (posterURL = e)} />
            </label>
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddMovie;
