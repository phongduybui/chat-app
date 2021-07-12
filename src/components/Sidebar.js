import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
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
        <NavLink to='/'>
          <Logo width={22} height={22} />
        </NavLink>
      </div>
      <ul className='nav'>
        <li className='nav__item'>
          <NavLink to='/chats' className='nav__link'>
            <BiChat />
          </NavLink>
        </li>
        <li className='nav__item sm-hide'>
          <NavLink to='/groups' className='nav__link'>
            <BiGroup />
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to='/calls' className='nav__link'>
            <BiPhone />
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to='/contacts' className='nav__link'>
            <BiUserPin />
          </NavLink>
        </li>
        <li className='nav__item'>
          <button className='nav__link'>
            <BiMoon />
          </button>
        </li>
        <li className='nav__item'>
          <NavLink to='/setting' className='nav__link'>
            <BiCog />
          </NavLink>
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
