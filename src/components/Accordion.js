import clsx from 'clsx';
import React, { useState, useRef } from 'react';
import { BiChevronRight } from 'react-icons/bi';

const Accordion = ({ TitleComponent, title, children, className }) => {
  const [active, setActive] = useState('');
  const [height, setHeight] = useState(0);

  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setActive(active === '' ? 'active' : '');
    setHeight(active === '' ? contentRef.current.scrollHeight : 0);
  };

  return (
    <div className={clsx('Accordion', className)}>
      <div className={clsx('Accordion__btn', active)} onClick={toggleAccordion}>
        <div className='Accordion__title'>
          {TitleComponent ? TitleComponent : title}
        </div>
        <BiChevronRight />
      </div>
      <div
        className={clsx('Accordion__content', active)}
        style={{ maxHeight: height }}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
