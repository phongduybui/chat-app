import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser } from '../redux/slices/userSlice';
import { toast } from 'react-toastify';

const RegisterPage = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { userInfo, error, loadingCreate } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      dispatch(createUser({ name, email, password }));
      setName('');
      setEmail('');
      setPassword('');
    } else {
      toast.warn('Please enter required field!');
    }
  };

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  return (
    <div className='RegisterPage'>
      <form className='register-form' onSubmit={handleFormSubmit}>
        <h1 className='h1'>REGISTER</h1>

        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button className='btn-register'>
          {loadingCreate ? <div className='loader' /> : 'REGISTER'}
        </button>

        <div className='link-register'>
          Have an account? <Link to='/login'>Login here!</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
