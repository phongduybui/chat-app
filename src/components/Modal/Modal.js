import React, { useRef } from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, open, onClose, header }) => {
  const ref = useRef(null);

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    // Them {capture: true} de chay dc
    document.addEventListener('click', onBodyClick, { capture: true });

    return () =>
      document.removeEventListener('click', onBodyClick, { capture: true });
  }, [onClose]);

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
