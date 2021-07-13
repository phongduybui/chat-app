import React, { useState } from 'react';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';

const FileType = ({ Icon, type, qty, size, color }) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className='FileType'>
      <div className='FileType__icon' style={{ color }}>
        {Icon}
      </div>
      <div className='FileType__wrapper'>
        <span className='FileType__type text-primary'>{type}</span>
        <p className='FileType__info text-secondary'>
          {`${qty} files, ${size}MB`}
        </p>
      </div>
      <button
        className='FileType__btn-expand text-secondary'
        onClick={() => setExpand(!expand)}
      >
        {expand ? <BiChevronDown /> : <BiChevronRight />}
      </button>
    </div>
  );
};

export default FileType;
