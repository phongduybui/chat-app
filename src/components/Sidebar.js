import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import { BiChat, BiGroup, BiCog, BiMoon, BiLogOut } from 'react-icons/bi';
import Avatar from './Avatar';
import { signOut } from '../firebase/services';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { screen } = useSelector((state) => state.chatScreen);

  const handleThemeToggle = () => {
    document?.body?.classList.toggle('dark-mode');
  };

  return (
    <aside className={clsx('Sidebar', screen !== 'chat-list' && 'hidden')}>
      <div className='brand'>
        <NavLink to='/'>
          <Logo width={22} height={22} />
        </NavLink>
      </div>
      <ul className='nav'>
        <li className='nav__item'>
          <NavLink exact to='/' className='nav__link'>
            <BiChat />
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to='/users' className='nav__link'>
            <BiGroup />
          </NavLink>
        </li>
        <li className='nav__item'>
          <button className='nav__link toggle-theme' onClick={handleThemeToggle}>
            <BiMoon />
          </button>
        </li>
        <li className='nav__item'>
          <NavLink to='/setting' className='nav__link'>
            <BiCog />
          </NavLink>
        </li>
        <li className='nav__item md-hide'>
          <button className='nav__link' onClick={signOut} title='Sign Out'>
            <BiLogOut />
          </button>
        </li>
      </ul>
      <div className='user'>
        <Avatar size={36} src={userInfo?.photoURL} />
      </div>
    </aside>
  );
};

export default Sidebar;
