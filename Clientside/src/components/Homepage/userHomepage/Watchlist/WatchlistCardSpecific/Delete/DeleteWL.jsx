import React, { useState } from 'react';
import { Delete } from '@mui/icons-material';
import { Modal, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../../../../../../Context/Context';
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

const DeleteWL = ({ theTitle }) => {
  const [open, setOpen] = useState(false); // variables for open/close
  const { theUserId } = useMovieContext(); // global variable

  const navigate = useNavigate();
  const handleOpen = () => setOpen(true); // set the value to true/open
  const handleClose = () => setOpen(false); // set the value to false/close

  const deleteIt = async () => {
    await fetch(`http://localhost:8000/user/watchlist/${theTitle}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-usersid': `${theUserId}`,
      },
    });

    return navigate('/userHomepage/Watchlist'); // redirect to watchlist
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

export default DeleteWL;
