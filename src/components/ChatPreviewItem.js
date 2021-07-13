import React from 'react';
import Avatar from './Avatar';

const ChatPreviewItem = ({ userName, latestMessage, time }) => {
  return (
    <div className='ChatPreviewItem'>
      <Avatar
        size={36}
        src={`https://ui-avatars.com/api/?background=random&color=fff&name=random`}
      />
      <div className='ChatPreviewItem__wrapper'>
        <div className='ChatPreviewItem__info'>
          <span className='user-name text-primary'>{userName}</span>
          <span className='time text-secondary'>{time}</span>
        </div>
        <p className='ChatPreviewItem__latest-message text-secondary'>
          {latestMessage}
        </p>
      </div>
    </div>
  );
};

export default ChatPreviewItem;
