import React from 'react';
import { BiSearch, BiX } from 'react-icons/bi';

const SearchBox = ({ term, onTermChange, resetTerm }) => {
  return (
    <div className='SearchBox'>
      <input
        type='text'
        placeholder='Search...'
        className='SearchBox__input'
        value={term}
        onChange={(e) => onTermChange(e.target.value)}
      />
      <button type='button' className='SearchBox__btn' onClick={resetTerm}>
        {term ? <BiX fontSize={20} /> : <BiSearch />}
      </button>
    </div>
  );
};

export default SearchBox;
