import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import {
  BiChat,
  BiGroup,
  BiPhone,
  BiUserPin,
  BiMoon,
  BiCog,
} from 'react-icons/bi';

const Sidebar = () => {
  return (
    <aside className='Sidebar'>
      <div className='brand'>
        <Logo width={22} height={22} />
      </div>
      <ul className='nav'>
        <li className='nav__item'>
          <Link to='/chats' className='nav__link'>
            <BiChat />
          </Link>
        </li>
        <li className='nav__item sm-hide'>
          <Link to='/groups' className='nav__link'>
            <BiGroup />
          </Link>
        </li>
        <li className='nav__item'>
          <Link to='/calls' className='nav__link'>
            <BiPhone />
          </Link>
        </li>
        <li className='nav__item'>
          <Link to='/contacts' className='nav__link'>
            <BiUserPin />
          </Link>
        </li>
        <li className='nav__item'>
          <button to='/darkmode' className='nav__link'>
            <BiMoon />
          </button>
        </li>
        <li className='nav__item'>
          <Link to='/contacts' className='nav__link'>
            <BiCog />
          </Link>
        </li>
      </ul>
      <div className='user'>
        <img
          className='user__avatar'
          alt=''
          src={`https://ui-avatars.com/api/?background=random&color=fff&name=DP`}
        ></img>
      </div>
    </aside>
  );
};

export default Sidebar;
