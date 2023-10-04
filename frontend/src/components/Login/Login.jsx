import React, { useState } from 'react';
import { login } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Login.css';
import { NavLink } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../../assets/lady-walking.json'

function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <section id="login-page">
      <div id="login-container">
        <div id="login-lottie-box">
          <Lottie options={defaultOptions} height={400} width={'100%'}></Lottie>
        </div>
        <form onSubmit={handleSubmit} id="login-form">
          <h1 style={{fontWeight: 400}}>Sign in</h1>
          <ul id="login-error-box">
            {errors.map((error, idx) => (
              <li key={idx} className='login-errors'>{error}</li>
            ))}
          </ul>
          <input
              placeholder='Email'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='login-input'
            />
            <input
              placeholder='Password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='login-input'
            />
          <button type="submit" id="login-continue">Continue</button>
          <footer id="sign-up-here">
            <p>Don't have an account?</p><NavLink to='/signup' id="login-sign-link">Sign up here.</NavLink>
          </footer>
        </form>
      </div>
    </section>
  );
}

export default Login;
