import React, { useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import ReactDOM from 'react-dom';

const Modal = ({ children, open, onClose, header }) => {
  const ref = useRef(null);

  useClickOutside(ref, onClose);

  return (
    open &&
    ReactDOM.createPortal(
      <div className='Modal'>
        <div className='Modal__content' ref={ref}>
          <div className='Modal__header'>
            <h3>{header}</h3>
            <button onClick={onClose}>&times;</button>
          </div>
          {children}
        </div>
      </div>,
      document.querySelector('#modal')
    )
  );
};

export default Modal;
