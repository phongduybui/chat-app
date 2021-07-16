import React from 'react';
import CollapsibleBar from '../components/CollapsibleBar';
import Avatar from '../components/Avatar';
import SearchBox from '../components/SearchBox';
import {
  AiFillFile,
  AiFillPicture,
  AiFillPlaySquare,
  AiFillSwitcher,
} from 'react-icons/ai';
import { BiMessageAdd, BiDotsVerticalRounded } from 'react-icons/bi';
import { BsFillFolderSymlinkFill, BsFillFolderFill } from 'react-icons/bs';
import ChatPreviewItem from '../components/ChatPreviewItem';
import FileType from '../components/FileType';
import ChatBox from '../components/ChatBox';

const ChatPage = () => {
  return (
    <div className='ChatPage'>
      <CollapsibleBar direction='left' title='Chat' className='ChatPage__user'>
        <div className='user'>
          <Avatar
            size={70}
            hasState
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
      <div className='ChatPage__chat-box'>
        <ChatBox />
      </div>
      <CollapsibleBar
        direction='right'
        title='Shared Files'
        className='ChatPage__shared-files'
      >
        <div className='user'>
          <Avatar
            size={70}
            src={`https://ui-avatars.com/api/?background=random&color=fff&name=Jonash Astrole`}
          />
          <span className='user__name title'>Jonash Astrold</span>
          <span className='text-secondary'>Your Friend</span>
        </div>
        <div className='type'>
          <div className='type__wrapper'>
            <BsFillFolderFill />
            <div className='type__info'>
              <span className='type__title'>All files</span>
              <span className='type__qty'>231</span>
            </div>
          </div>
          <div className='type__wrapper'>
            <BsFillFolderSymlinkFill />
            <div className='type__info'>
              <span className='type__title'>All links</span>
              <span className='type__qty'>231</span>
            </div>
          </div>
        </div>
        <div className='file-title'>
          <span>Files</span>
          <button>
            <BiDotsVerticalRounded fontSize={18} />
          </button>
        </div>
        <div>
          <FileType
            type='Documents'
            Icon={<AiFillFile />}
            qty={213}
            size={50}
            color='#5A68DF'
          />
          <FileType
            type='Photos'
            Icon={<AiFillPicture />}
            qty={213}
            size={50}
            color='#CCBA89'
          />
          <FileType
            type='Videos'
            Icon={<AiFillPlaySquare />}
            qty={213}
            size={50}
            color='#5AB0BA'
          />
          <FileType
            type='Others'
            Icon={<AiFillSwitcher />}
            qty={213}
            size={50}
            color='#BE6E5F'
          />
        </div>
      </CollapsibleBar>
    </div>
  );
};

export default ChatPage;
