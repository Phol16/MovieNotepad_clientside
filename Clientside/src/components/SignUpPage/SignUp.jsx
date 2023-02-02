import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import style from './style.module.css';
import NavBar from '../Navbar/NavBar';

const user_regex = /^[a-zA-Z][a-zA-Z0-9-_](?=.*[@]).{3,23}$/;
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;
const REGISTER_URL = '/register';

const SignUp = () => {
  const userRef = useRef(null);
  const errRef = useRef();
  const navigate = useNavigate();

  const [radioValue, setRadioValue] = useState('user')
  const [loading, setLoading] = useState('none'); //variable for the invalidinput text

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = user_regex.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = password_regex.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg('');
  }, [user, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading('inline-block')

    if(radioValue === 'admin'){
       await fetch('https://movienotepad-serverside.onrender.com/adminUser', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user,
          password,
        }),
      });
      setLoading('none')
      return setSuccess(true);
    }
    await fetch('https://movienotepad-serverside.onrender.com/user', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user,
          password,
        }),
      });
      setLoading('none')
      setSuccess(true)
  };
  const toLogin = () => {
    navigate('/');
  };
  const radioFunction = (e)=>{
    setRadioValue(e.target.value)
  }
  console.log(radioValue)

  return (
    <section className={style.background}>
      <NavBar />
      {success ? (
        <section className={style.signUpContainer}>
          <h1>Success</h1>
          <p>
            <button className={style.loginButton} onClick={toLogin}>
              Login
            </button>
          </p>
        </section>
      ) : (
        <section className={style.signUpContainer}>
          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
            {errMsg}
          </p>
          <h1 className={style.title}>Register</h1>
          <form className={style.signUpForm} onSubmit={handleSubmit}>
            <label htmlFor='username' className={style.signUpLabel}>
              Email:
              <span className={validName ? style.valid : style.hide}>
                <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
              </span>
              <span className={validName || !user ? style.hide : style.invalid}>
                <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
              </span>
            </label>
            <input
              className={style.signUpInput}
              type='text'
              id='username'
              ref={userRef}
              required
              autoComplete='off'
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby='uidnote'
              onChange={(e) => {
                setUser(e.target.value);
              }}
              onFocus={() => {
                setUserFocus(true);
              }}
              onBlur={() => {
                setUserFocus(false);
              }}
            />
            <p id='uidnote' className={userFocus && user && !validName ? style.instruction : style.offscreen}>
              <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '2px' }} />
              4 to 24 characters. <br />
              Must begin with a letter. <br />
              Letters, numbers, underscores, hypens allowed.<br/>
              must have @ symbol.
            </p>
            <label htmlFor='password' className={style.signUpLabel}>
              Password:
              <span className={validPassword ? style.valid : style.hide}>
                <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
              </span>
              <span className={validPassword || !password ? style.hide : style.invalid}>
                <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
              </span>
            </label>
            <input
              className={style.signUpInput}
              type='password'
              id='password'
              ref={userRef}
              required
              autoComplete='off'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onFocus={() => {
                setPasswordFocus(true);
              }}
              onBlur={() => {
                setPasswordFocus(false);
              }}
            />
            <p className={passwordFocus && password && !validPassword ? style.instruction : style.offscreen}>
              <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '2px' }} />
              9 to 25 characters. <br />
              Must have an uppercase and lowercase letters, and a number and a special character. <br />
              Allowed special character ! @ # $ % ..
            </p>
            <label htmlFor='confirmPassword' className={style.signUpLabel}>
              Confirm Password:
              <span className={validMatch && matchPassword ? style.valid : style.hide}>
                <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
              </span>
              <span className={validMatch || !matchPassword ? style.hide : style.invalid}>
                <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
              </span>
            </label>
            <input
              className={style.signUpInput}
              type='password'
              id='confirmPassword'
              ref={userRef}
              required
              autoComplete='off'
              onChange={(e) => {
                setMatchPassword(e.target.value);
              }}
              onFocus={() => {
                setMatchFocus(true);
              }}
              onBlur={() => {
                setMatchFocus(false);
              }}
            />
            <p className={matchFocus && matchPassword && !validMatch ? style.instruction : style.offscreen}>
              <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '2px' }} />
              Must be the same with password
            </p>
            <section className={style.radioButton}>
              <h5>Select Role:</h5>
              <label htmlFor='admin'>Admin</label>
              <input type='radio' value='admin' className={style.radioButtonInput} checked={radioValue === 'admin'} onChange={radioFunction}/>
              <label htmlFor='user'>User</label>
              <input type='radio' value='user' className={style.radioButtonInput} checked={radioValue === 'user'} onChange={radioFunction}/>
            </section>
            <button disabled={!validName || !validPassword || !validMatch ? true : false} className={style.signUpButton}>
            <i className='fa fa-spinner fa-spin' style={{ display: `${loading}`, marginRight: '10px' }} ></i>
              Sign Up
            </button>
          </form>
          <section className={style.registered}>
            <p>Already registered?</p>
            <button className={style.loginButton} onClick={toLogin}>
              LogIn
            </button>
          </section>
        </section>
      )}
    </section>
  );
};

export default SignUp;
