import React from 'react';
import Avatar from './Avatar';

const Message = ({ test }) => {
  return (
    <div className='Message'>
      <Avatar
        size={35}
        src={`https://ui-avatars.com/api/?background=random&color=fff&name=Jonash Astrole`}
        hasBorder
      />
      <div className='Message__list'>
        <div className='Message__content '>
          Ooo, why don't you say something more {test}
        </div>

        <div className='Message__content '>
          Ooo, why don't you say something more
        </div>
        <div className='Message__content '>
          Ooo, why don't you say something more
        </div>
        <div className='Message__content '>
          Ooo, why don't you say something more
        </div>
        <div className='Message__content Message__content--first'>
          Ooo, why don't you say something more
        </div>
      </div>
    </div>
  );
};

export default Message;
