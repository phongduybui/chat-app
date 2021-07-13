import React, { useState } from 'react';
import clsx from 'clsx';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CollapsibleBar = ({ title, direction, className, children }) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className={clsx('CollapsibleBar', className, collapse && 'collapse')}>
      <div className='CollapsibleBar__title'>
        <button onClick={() => setCollapse(!collapse)}>
          {direction === 'left' ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
        <span className='h1'>{title}</span>
      </div>
      <div className='CollapsibleBar__content'>{children}</div>
    </div>
  );
};

export default CollapsibleBar;
