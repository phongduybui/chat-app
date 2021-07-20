import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { setRoomModalVisible } from '../redux/slices/roomModalSlice';
import AddRoomModal from '../components/Modal/AddRoomModal';
import useFirestore from '../hooks/useFirestore';
import { setRooms, setSelectedRoom } from '../redux/slices/roomSlice';
import { formatDateToNow } from '../utils/formatDate';
import AvatarGroup from '../components/AvatarGroup';

const ChatPage = ({ match }) => {
  const dispatch = useDispatch();

  const roomId = match.params.id;

  const [userState, setUserState] = useState('available');
  const { userInfo } = useSelector((state) => state.user);
  const { isVisible } = useSelector((state) => state.isAddRoomVisible);
  const { roomList, selectedRoom } = useSelector((state) => state.rooms);

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: userInfo?.uid,
    };
  }, [userInfo]);

  const rooms = useFirestore('rooms', roomsCondition);

  useEffect(() => {
    dispatch(setRooms(rooms));
    dispatch(setSelectedRoom(rooms[0]));
  }, [dispatch, rooms]);

  return (
    <div className='ChatPage'>
      <CollapsibleBar direction='left' title='Chat' className='ChatPage__user'>
        <div className='user'>
          <Avatar size={70} userState={userState} src={userInfo?.photoURL} />
          <span className='user__name title'>{userInfo?.displayName}</span>
          <select
            className='user__state'
            value={userState}
            onChange={(e) => setUserState(e.target.value)}
          >
            <option value='available'>available</option>
            <option value='offline'>offline</option>
            <option value='busy'>busy</option>
          </select>
        </div>
        <SearchBox />
        <div className='user__last-chats'>
          <div className='title'>
            <span>Last chats</span>
            <button onClick={() => dispatch(setRoomModalVisible(true))}>
              <BiMessageAdd fontSize={18} />
            </button>
          </div>
          <div className='list-chat'>
            {roomList.map((room, index) => (
              <ChatPreviewItem
                key={room.id || index}
                id={room.id}
                name={room.name}
                desc={room.desc}
                time={formatDateToNow(room.createdAt?.seconds || 1)}
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
          {/* <AvatarGroup>
            {selectedRoom?.members.map((mem) => (
              <Avatar
                size={70}
                hasBorder
                // src={mem}
              />
            ))}
          </AvatarGroup> */}

          <span className='user__name title'>{selectedRoom?.name}</span>
          <div className='members'>
            <span className='text-secondary'>Members</span>
            <div className='members-list'>
              <div className='member-wrapper'>
                <div>
                  <Avatar
                    size={28}
                    src='https://ui-avatars.com/api/?background=random&color=fff&name=random'
                  />
                  <span className='member-name'>Duy Phong</span>
                </div>
                <span className='member-action'>
                  <BiDotsVerticalRounded fontSize={18} />
                </span>
              </div>
            </div>
          </div>
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
      <AddRoomModal
        open={isVisible}
        onClose={() => dispatch(setRoomModalVisible(false))}
      />
    </div>
  );
};

export default ChatPage;
