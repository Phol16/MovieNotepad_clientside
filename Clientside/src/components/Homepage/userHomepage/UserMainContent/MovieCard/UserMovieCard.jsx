import { LocalMovies } from '@mui/icons-material';
import { Avatar, Box, Card, CardHeader, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../../../../../Context/Context';
import style from './style.module.css';

function UserMovieCard({ details }) {
  const { getCard } = useMovieContext(); //global variable
  const navigate = useNavigate();

  const theMovie = () => {
    getCard(details.title); // set the value of the cardVariable
    navigate('/userHomepage/Movie'); //redirect to each card page
  };

  return (
    <Box className={style.container}>
      <button className={style.button} onClick={theMovie}>
        <Card sx={{ borderRadius: '15px',width: '250px', height: '400px' }}>
          <CardHeader
            sx={{ bgcolor: '#1a2a38', color: 'white', height: '70px' }}
            title={details.title}
            avatar={
              <Avatar>
                <LocalMovies color="primary" />
              </Avatar>
            }
          />
          <CardMedia sx={{ height: '100%', width: '100%' }} component="img" alt={details.posterURL} image={`${details.posterURL}`} />
        </Card>
      </button>
    </Box>
  );
}

export default UserMovieCard;
