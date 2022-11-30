import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Email, Lock } from '@mui/icons-material';
import { useMovieContext } from '../../Context/Context';
import NavBar from '../theComponents/Navbar/NavBar';
import style from './style.module.css';

const Login = () => {
  const [emailAccount, setEmailAccount] = useState([]); //variable for the emailaccount value
  const [passwordAccount, setPasswordAccount] = useState([]); //variable for the password value
  const [inputValid, setInputValid] = useState(''); //variable for the invalidinput text

  const { getUserId } = useMovieContext(); // variable to get the users Id
  const navigate = useNavigate();

  const theEmail = (e) => {
    setEmailAccount(e.target.value); // set the value for email
  };
  const thePassword = (e) => {
    setPasswordAccount(e.target.value); // set the value for password
  };

  const submit = async (e) => {
    e.preventDefault();
    const validUser = await fetch(`http://localhost:8000/adminUser?Email=${emailAccount}`).then((res) => res.json());

    //check if email and password matches or has a value
    if (!validUser.theAdminUser || validUser.theAdminUser.email !== emailAccount || validUser.theAdminUser.password !== passwordAccount) {
      return setInputValid('Invalid Input'); // set the value for the invalid input text
    }

    getUserId(validUser.theAdminUser._id); //set the value for the user Id

    //condition statement to redirect depends on the role
    if (validUser.theAdminUser.role === 'admin_User') {
      return navigate('/adminHomepage'); // redirect to admin homepage
    }
    navigate('/userHomepage'); //redirect to user homepage
  };

  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.subContainer}>
        LOGIN
        <form onSubmit={(e) => submit(e)}>
          <label htmlFor="Email">
            <span>
              <Email /> Email:
            </span>
            <input onChange={theEmail} type="text" id="Email" name="Email" required placeholder="Email" />
          </label>
          <br />
          <label htmlFor="Password">
            <span>
              <Lock /> Password:
            </span>
            <input onChange={thePassword} type="password" id="Password" name="Password" required placeholder="password" />
          </label>
          <br />
          <span className={style.invalidInput}>{inputValid}</span>
          <br />
          <input className={style.submit} type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
