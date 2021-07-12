import React from 'react';
import { BiSearch } from 'react-icons/bi';

const SearchBox = () => {
  return (
    <form className='SearchBox'>
      <input type='text' placeholder='Search...' className='SearchBox__input' />
      <button className='SearchBox__btn'>
        <BiSearch />
      </button>
    </form>
  );
};

export default SearchBox;
