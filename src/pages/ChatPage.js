import React from 'react';
import CollapsibleBar from '../components/CollapsibleBar';
import Avatar from '../components/Avatar';
import SearchBox from '../components/SearchBox';
import { BiMessageAdd } from 'react-icons/bi';
import ChatPreviewItem from '../components/ChatPreviewItem';

const ChatPage = () => {
  return (
    <div className='ChatPage'>
      <CollapsibleBar direction='left' title='Chat' className='ChatPage__user'>
        <div className='user'>
          <Avatar
            size={70}
            src={`https://ui-avatars.com/api/?background=random&color=fff&name=DP`}
          />
          <span className='user__name title'>Duy Phong</span>
          <select className='user__state'>
            <option value='available'>available</option>
            <option value='offline'>offline</option>
            <option value='busy'>busy</option>
          </select>
        </div>
        <SearchBox />
        <div className='user__last-chats'>
          <div className='title'>
            <span>Last chats</span>
            <button>
              <BiMessageAdd fontSize={18} />
            </button>
          </div>
          <div className='list-chat'>
            {Array(8)
              .fill()
              .map((x, i) => (
                <ChatPreviewItem
                  key={i}
                  userName='Duy Phong'
                  latestMessage='Good night, wish best to youuuuuu'
                  time='8:15'
                />
              ))}
          </div>
        </div>
      </CollapsibleBar>
      <div className='ChatPage__chat-box'></div>
      <CollapsibleBar
        direction='right'
        title='Shared Files'
        className='ChatPage__shared-files'
      ></CollapsibleBar>
    </div>
  );
};

export default ChatPage;
