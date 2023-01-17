import React, { useState } from 'react';
import { useMovieContext } from '../../../../../../Context/Context';
import { Edit } from '@mui/icons-material';
import { Modal, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { useEffect } from 'react';

const theStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  border: '2px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const UpdateButton = ({ theTitle }) => {
  const [open, setOpen] = useState(false); // variable for open/close
  const [movieData, setMovieData] = useState({}); // variable
  const { getUpdate, theUserId } = useMovieContext(); // global variable

  const navigate = useNavigate();
  const handleOpen = () => setOpen(true); // set the value to true/open
  const handleClose = () => setOpen(false); // set the value to false/close

  //the values of ...
  let title = '';
  let imdbId = '';
  let genre = [];
  let posterURL = '';

  useEffect(() => {
    fetchData(`https://movienotepad-serverside.onrender.com/movies?search=${theTitle}`);
  }, [open]);

  const fetchData = async (url) => {
    const response = await fetch(url).then((res) => res.json());
    setMovieData(response); // set the value of the movie details
  };

  const theValue = (e) => {
    setMovieData({ title: title.value, imdbId: imdbId.value, genre: [genre.value], posterURL: posterURL.value }); // set the values of ...
  };

  const theMovie = async (e) => {
    e.preventDefault();

    const response = await fetch(`https://movienotepad-serverside.onrender.com/adminUser/movies/${theTitle}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'x-usersid': `${theUserId}`,
      },
      body: JSON.stringify(movieData),
    }).then((response) => response.json());

    // check if the user is the one who uploaded the movieData
    if (response.error === `No Movie published with title:${theTitle}`) {
      return handleClose(); // clsoe the modal
    }

    getUpdate(movieData.title); // update
    navigate('/adminHomepage'); // redirect to admin homepage
  };

  return (
    <span>
      <button className={style.theAdminButton} onClick={handleOpen}>
        <Edit />
      </button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Stack sx={theStyle}>
          <form onSubmit={theMovie}>
            <label htmlFor="title" className={style.label}>
              Title:
              <br />
              <input type="text" id="title" name="title" placeholder="Title" onChange={theValue} ref={(e) => (title = e)} value={movieData.title} />
            </label>
            <br />
            <br />
            <label htmlFor="imdbId" className={style.label}>
              Imdb Id:
              <br />
              <input type="text" id="imdbId" name="imdbId" placeholder="Imdb Id" onChange={theValue} ref={(e) => (imdbId = e)} value={movieData.imdbId} />
            </label>
            <br />
            <br />
            <label htmlFor="genre" className={style.label}>
              Genre:
              <br />
              <input type="text" id="genre" name="genre" placeholder="Genre" onChange={theValue} ref={(e) => (genre = e)} value={movieData.genre} />
            </label>
            <br />
            <br />
            <label htmlFor="posterURL" className={style.label}>
              PosterUrl:
              <br />
              <input type="text" id="posterURL" name="posterURL" placeholder="PosterURL" onChange={theValue} ref={(e) => (posterURL = e)} value={movieData.posterURL} />
            </label>
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
          <button className={style.button} onClick={handleClose}>
            Cancel
          </button>
        </Stack>
      </Modal>
    </span>
  );
};

export default UpdateButton;
