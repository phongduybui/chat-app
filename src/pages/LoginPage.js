import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithEmail,
} from '../firebase/services';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { ReactComponent as Loading } from '../assets/icons/loading-2.svg';

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      signInWithEmail(email, password)
        .then(() => console.log('success login'))
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  return (
    <div className='LoginPage'>
      <form className='login-form' onSubmit={handleFormSubmit}>
        <h1 className='h1'>LOGIN</h1>

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className='error'>{error}</p>}

        <button className='btn-login'>LOGIN</button>

        {loading && <Loading />}

        <span className='divider'>Or login with</span>

        <div className='provider'>
          <button type='button' className='gg' onClick={signInWithGoogle}>
            <FcGoogle />
            Google
          </button>
          <button type='button' className='fb' onClick={signInWithFacebook}>
            <FaFacebook />
            Facebook
          </button>
        </div>
        <div className='link-register'>
          Not a members? <Link to='/register'>Sign up now!</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
