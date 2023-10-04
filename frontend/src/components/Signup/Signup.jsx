import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './Signup.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../../assets/pinkwave.json'

function Signup() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {},
  }

  if (user) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(firstname, lastname, username, email, password)
      );
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors([
        'Confirm Password field must be the same as the Password field',
      ]);
    }
  };

  return (
    <section id="signup-page">
      <div id="signup-container">
        <form onSubmit={handleSubmit} id="signup-form-box">
          <h1 id='signup-prompt'>Create an Account</h1>
          <ul id="signup-error-box">
            {errors.map((error, idx) => (
              <li key={idx} className='signup-errors'>{error}</li>
            ))}
          </ul>
          <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              placeholder='Firstname'
              className='signup-input'
            />
          <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              placeholder='Lastname'
              className='signup-input'
            />
          <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Email'
              className='signup-input'
            />
          <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder='Username'
              className='signup-input'
            />
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Password'
              className='signup-input'
            />
          <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder='Confirm Password'
              className='signup-input'
            />
          <button type="submit" id="signup-submit-btn">CONTINUE</button>
          <footer id="signup-footer"><p>Already have an account?</p><NavLink to='/login' id="signup-login-link">Log in here.</NavLink></footer>
        </form>
        <aside id="signup-lottie-box">
              <Lottie options={defaultOptions} height={500} width={'100%'}></Lottie>
        </aside>
      </div>
    </section>
  );
}

export default Signup;
