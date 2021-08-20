import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import history from '../history';
import { setChatScreenMobile } from '../redux/slices/chatScreenSlice';
import { setSelectedRoom } from '../redux/slices/roomSlice';
import Avatar from './Avatar';

const ChatPreviewItem = ({ id, name, latestMessage, time, desc }) => {
  const dispatch = useDispatch();

  const { roomList } = useSelector((state) => state.rooms);

  const handleChatItemClick = (id) => {
    if (id) {
      const selectedRoom = roomList.find((r) => r.id === id);
      dispatch(setSelectedRoom(selectedRoom || ''));
      dispatch(setChatScreenMobile('chat-content'));
      history.push(`/${id}`);
    }
  };

  return (
    <div className='ChatPreviewItem' onClick={() => handleChatItemClick(id)}>
      <Avatar
        size={36}
        src={`https://ui-avatars.com/api/?background=random&color=fff&name=${name}`}
      />
      <div className='ChatPreviewItem__wrapper'>
        <div className='ChatPreviewItem__info'>
          <span className='user-name text-primary'>{name}</span>
          <span className='time text-secondary'>{time}</span>
        </div>
        <p className='ChatPreviewItem__latest-message text-secondary'>
          {latestMessage ? latestMessage : desc}
        </p>
      </div>
    </div>
  );
};

export default ChatPreviewItem;
