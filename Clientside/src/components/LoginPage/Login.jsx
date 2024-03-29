import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Email, Lock } from '@mui/icons-material';
import { useMovieContext } from '../../Context/Context';
import NavBar from '../Navbar/NavBar';
import style from './style.module.css';

const Login = () => {
  const [emailAccount, setEmailAccount] = useState([]); //variable for the emailaccount value
  const [passwordAccount, setPasswordAccount] = useState([]); //variable for the password value
  const [inputValid, setInputValid] = useState(''); //variable for the invalidinput text
  const [loading, setLoading] = useState('none'); //variable for the invalidinput text

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
    const validUser = await fetch(`https://movienotepad-serverside.onrender.com/adminUser?Email=${emailAccount}`).then((res) => res.json());

    //check if email and password matches or has a value
    if (!validUser.theAdminUser || validUser.theAdminUser.email !== emailAccount || validUser.theAdminUser.password !== passwordAccount) {
      setLoading('none');
      return setInputValid('Invalid Input'); // set the value for the invalid input text
    }

    getUserId(validUser.theAdminUser._id); //set the value for the user Id

    //condition statement to redirect depends on the role
    if (validUser.theAdminUser.role === 'admin_User') {
      return navigate('/adminHomepage'); // redirect to admin homepage
    }
    navigate('/userHomepage'); //redirect to user homepage
  };
  const toSignUp=()=>{
    navigate('/signUp')
  }

  const load = () => {
    setLoading('inline-block');
    setInputValid('');
  };
  return (
    <div className={style.background}>
      <NavBar />
    <div className={style.container}>
      <div className={style.subContainer}>
        MovieNotepad
        <form onSubmit={(e) => submit(e)}>
          <label htmlFor='Email' className={style.label}>
            <span>
              <Email /> Email:
            </span>
            <input onChange={theEmail} type='text' id='Email' name='Email' required placeholder='Email' />
          </label>
          <br />
          <label htmlFor='Password'>
            <span>
              <Lock /> Password:
            </span>
            <input onChange={thePassword} type='password' id='Password' name='Password' required placeholder='password' />
          </label>
          <br />
          <span className={style.invalidInput}>{inputValid}</span>
          <br />
          <section className={style.actionButtons}>
          <button className={style.signUp} type='button' onClick={toSignUp}>Sign Up</button>
          <button className={style.submit} type='submit' onClick={load}>
            <i className='fa fa-spinner fa-spin' style={{ display: `${loading}`, marginRight: '10px' }} ></i>Login{' '}
          </button>
          </section>
        </form>
      </div>
      <section className={style.note}>
       <h3>Note: <span>Initial request from server will take time</span><br/></h3>
       <p>(because of free host service)</p><br/>
        <p>Available AdminAccount</p>
        <li>adminUser@gmail.com</li>
        <p>password: <span>qwerty</span></p>
        <p>Available UserAccount</p>
        <li>user@gmail.com</li>
        <li>user1@gmail.com</li>
        <p>password: <span>qwerty</span></p>

      </section>
    </div>
    </div>
  );
};

export default Login;
