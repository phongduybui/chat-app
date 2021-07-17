import React, { useState } from 'react';
import clsx from 'clsx';
import ChatInput from './ChatInput';
import Avatar from './Avatar';
import Message from './Message';

const ChatBox = () => {
  const [activeTab, setActiveTab] = useState('message');

  return (
    <div className='ChatBox'>
      <div className='ChatBox__title'>
        <h2 className='h1'>Group Chat</h2>
        <div className='tabs'>
          <button
            className={clsx(activeTab === 'message' && 'active')}
            onClick={() => setActiveTab('message')}
          >
            Message
          </button>
          <button
            className={clsx(activeTab === 'participants' && 'active')}
            onClick={() => setActiveTab('participants')}
          >
            Participants
          </button>
        </div>
      </div>
      <div className='ChatBox__wrapper-content'>
        <Message test='abcdtest' />

        <Message />
        <Message />
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatBox;
