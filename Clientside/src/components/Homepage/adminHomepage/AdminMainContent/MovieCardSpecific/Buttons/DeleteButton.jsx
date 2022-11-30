import React, { useState } from 'react';
import { useMovieContext } from '../../../../../../Context/Context';
import { Delete } from '@mui/icons-material';
import { Box, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import style from './style.module.css';

const theStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DeleteButton = ({ theTitle }) => {
  const [open, setOpen] = useState(false); // variables for open/close
  const { getUpdate, theUserId } = useMovieContext(); // global variable

  const navigate = useNavigate();
  const handleOpen = () => setOpen(true); // set the value to true/open
  const handleClose = () => setOpen(false); // set the value to false/close

  const deleteIt = async () => {
    const response = await fetch(`http://localhost:8000/adminUser/movies/${theTitle}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-usersid': `${theUserId}`,
      },
    }).then((response) => response.json());

    //check if the user is the one who uploaded the movieData
    if (response.error === `No Movie published with title:${theTitle}`) {
      return handleClose(); // close the modal
    }

    getUpdate('theTitle'); // update
    navigate('/adminHomepage'); // redirect to admin homepage
  };

  return (
    <span>
      <button className={style.theAdminButton} onClick={handleOpen}>
        <Delete />
      </button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={theStyle}>
          <p className={style.textConfirm}>{`Do you want to delete ${theTitle}?`}</p>
          <button className={style.conCan} onClick={deleteIt}>
            Confirm
          </button>
          <button className={style.conCan} onClick={handleClose}>
            Cancel
          </button>
        </Box>
      </Modal>
    </span>
  );
};

export default DeleteButton;
