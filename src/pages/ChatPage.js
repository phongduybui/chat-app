import React, { useEffect, useState } from 'react';
import CollapsibleBar from '../components/CollapsibleBar';
import Avatar from '../components/Avatar';
import SearchBox from '../components/SearchBox';
import { AiFillFile, AiFillPicture, AiFillPlaySquare } from 'react-icons/ai';
import { BiMessageAdd, BiDotsVerticalRounded } from 'react-icons/bi';
import { BsFillFolderSymlinkFill, BsFillFolderFill } from 'react-icons/bs';
import ChatPreviewItem from '../components/ChatPreviewItem';
import FileType from '../components/FileType';
import ChatBox from '../components/ChatBox';
import { useDispatch, useSelector } from 'react-redux';
import { setRoomModalVisible } from '../redux/slices/roomModalSlice';
import AddRoomModal from '../components/Modal/AddRoomModal';
import {
  fetchImagesShared,
  fetchMembersInRoom,
  setRooms,
  setSelectedRoom,
} from '../redux/slices/roomSlice';
import { formatDateToNow } from '../utils/formatDate';
import AvatarGroup from '../components/AvatarGroup';
import Accordion from '../components/Accordion';
import { db } from '../firebase/config';

const ChatPage = ({ match, history }) => {
  const dispatch = useDispatch();

  const [userState, setUserState] = useState('available');
  const { userInfo } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const { isVisible } = useSelector((state) => state.isAddRoomVisible);
  const { roomList, selectedRoom, roomMembers, roomImages } = useSelector(
    (state) => state.rooms
  );

  useEffect(() => {
    let collectionRef = db.collection('rooms').orderBy('createdAt');

    if (userInfo?.uid) {
      collectionRef = collectionRef.where(
        'members',
        'array-contains',
        userInfo.uid
      );
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const rooms = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      dispatch(setRooms(rooms));
    });

    return unsubscribe;
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (match.params.roomId) {
      const roomSelected = roomList.find((r) => r.id === match.params.roomId);
      dispatch(setSelectedRoom(roomSelected || ''));
      dispatch(fetchMembersInRoom());
    }
  }, [dispatch, match.params.roomId, roomList]);

  useEffect(() => {
    if (match.params.roomId) {
      dispatch(fetchImagesShared({ roomId: match.params.roomId }));
    }
  }, [dispatch, match.params.roomId, messages]);

  return (
    <div className='ChatPage'>
      <CollapsibleBar
        defaultState={false}
        direction='left'
        title='Chat'
        className='ChatPage__user'
      >
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
                key={room?.id || index}
                id={room?.id}
                name={room?.name}
                desc={room?.desc}
                time={formatDateToNow(room?.createdAt?.seconds || 1)}
              />
            ))}
          </div>
        </div>
      </CollapsibleBar>
      <div className='ChatPage__chat-box'>
        <ChatBox />
      </div>
      <CollapsibleBar
        defaultState={true}
        direction='right'
        title='Shared Files'
        className='ChatPage__shared-files'
      >
        <div className='user'>
          {roomMembers.length > 2 ? (
            <AvatarGroup>
              {roomMembers.map((mem, index) => (
                <Avatar
                  key={mem?.uid || index}
                  size={60}
                  hasBorder
                  src={mem?.photoURL}
                />
              ))}
            </AvatarGroup>
          ) : (
            <Avatar
              src={`https://ui-avatars.com/api/?background=random&color=fff&name=${selectedRoom?.name}`}
              size={70}
            />
          )}

          <span className='user__name title'>{selectedRoom?.name}</span>
          <div className='members'>
            <Accordion title='Members'>
              {roomMembers.map((mem, index) => (
                <div className='member-wrapper' key={mem?.uid || index}>
                  <div className='member-info'>
                    <Avatar size={28} src={mem?.photoURL} />
                    <span className='member-name'>{mem?.displayName}</span>
                  </div>
                  <span className='member-action'>
                    <BiDotsVerticalRounded fontSize={18} />
                  </span>
                </div>
              ))}
            </Accordion>
          </div>
        </div>
        <div className='type'>
          <div className='type__wrapper'>
            <BsFillFolderFill />
            <div className='type__info'>
              <span className='type__title'>All files</span>
              <span className='type__qty'>{roomImages.length}</span>
            </div>
          </div>
          <div className='type__wrapper'>
            <BsFillFolderSymlinkFill />
            <div className='type__info'>
              <span className='type__title'>All links</span>
              <span className='type__qty'>0</span>
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
            type='Photos'
            Icon={<AiFillPicture />}
            qty={roomImages.length}
            color='#CCBA89'
          >
            {roomImages.map((imgUrl) => (
              <a
                href={imgUrl}
                download
                target='_blank'
                rel='noreferrer'
                key={imgUrl}
              >
                <img src={imgUrl} className='room-images' alt='' />
              </a>
            ))}
          </FileType>
          <FileType
            type='Documents'
            Icon={<AiFillFile />}
            qty={0}
            color='#5A68DF'
          />
          <FileType
            type='Videos'
            Icon={<AiFillPlaySquare />}
            qty={0}
            color='#5AB0BA'
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
