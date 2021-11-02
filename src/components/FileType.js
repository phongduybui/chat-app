import React from 'react';
import Accordion from './Accordion';

const FileType = ({ Icon, type, qty, color, children }) => {
  // Can refactor viet lai doan nay!!
  const handleIconClick = () => {
    const btnExpand = document.querySelector(
      'div.CollapsibleBar.ChatPage__shared-files.collapse > div.CollapsibleBar__title > button'
    );
    if (btnExpand) {
      btnExpand.click();
    }
  };

  return (
    <Accordion
      TitleComponent={
        <div className='FileType'>
          <div
            className='FileType__icon'
            style={{ color }}
            onClick={handleIconClick}
          >
            {Icon}
          </div>
          <div className='FileType__wrapper'>
            <span className='FileType__type text-primary'>{type}</span>
            <p className='FileType__info text-secondary'>{`${qty} ${
              type === 'Links' ? 'links' : 'files'
            }`}</p>
          </div>
        </div>
      }
      className='FileType__accordion'
    >
      {children}
    </Accordion>
  );
};

export default FileType;
