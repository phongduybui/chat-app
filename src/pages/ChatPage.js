import React, { useEffect, useState } from 'react';
import CollapsibleBar from '../components/CollapsibleBar';
import Avatar from '../components/Avatar';
import SearchBox from '../components/SearchBox';
import ChatPreviewItem from '../components/ChatPreviewItem';
import FileType from '../components/FileType';
import ChatBox from '../components/ChatBox';
import AddRoomModal from '../components/Modal/AddRoomModal';
import AvatarGroup from '../components/AvatarGroup';
import Accordion from '../components/Accordion';
import {
  fetchMembersInRoom,
  setRooms,
  setSelectedRoom,
} from '../redux/slices/roomSlice';
import {
  AiFillFile,
  AiFillPicture,
  AiFillPlaySquare,
  AiOutlineLink,
} from 'react-icons/ai';
import { BiMessageAdd, BiDotsVerticalRounded } from 'react-icons/bi';
import { BsFillFolderSymlinkFill, BsFillFolderFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { setRoomModalVisible } from '../redux/slices/roomModalSlice';
import { formatDateToNow } from '../utils/formatDate';
import { db } from '../firebase/config';
import clsx from 'clsx';
import { setChatScreenMobile } from '../redux/slices/chatScreenSlice';
import { FiChevronLeft } from 'react-icons/fi';
import MemberItem from '../components/MemberItem';
import {
  getLinkMessages,
  getVideoMessages,
  getImageMessages,
} from '../utils/getMessages';

const ChatPage = ({ match }) => {
  const dispatch = useDispatch();

  const [userState, setUserState] = useState('available');
  const { userInfo } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const { isVisible } = useSelector((state) => state.isAddRoomVisible);
  const { roomList, selectedRoom, roomMembers } = useSelector(
    (state) => state.rooms
  );
  const { screen } = useSelector((state) => state.chatScreen);
  const linkMessages = getLinkMessages(messages);
  const videoMessages = getVideoMessages(messages);
  const imageMessages = getImageMessages(messages);

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

  return (
    <div className='ChatPage'>
      <CollapsibleBar
        defaultState={false}
        direction='left'
        title='Chat'
        className={clsx('ChatPage__user', screen)}
      >
        <div>
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
          <SearchBox uid={userInfo?.uid} />
          <div className='title'>
            <span>Last chats</span>
            <button onClick={() => dispatch(setRoomModalVisible(true))}>
              <BiMessageAdd fontSize={18} />
            </button>
          </div>
        </div>
        <div className='user__last-chats'>
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
      <div className={clsx('ChatPage__chat-box', screen)}>
        <ChatBox />
      </div>
      <CollapsibleBar
        defaultState={true}
        direction='right'
        title='Shared Files'
        className={clsx('ChatPage__shared-files', screen)}
      >
        <button
          className='btn-change-screen'
          onClick={() => dispatch(setChatScreenMobile('chat-content'))}
        >
          <FiChevronLeft />
        </button>
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
                <MemberItem
                  key={mem?.uid || index}
                  photoURL={mem?.photoURL}
                  displayName={mem?.displayName}
                  memUID={mem?.uid}
                />
              ))}
            </Accordion>
          </div>
        </div>
        <div className='type'>
          <div className='type__wrapper'>
            <BsFillFolderFill />
            <div className='type__info'>
              <span className='type__title'>All files</span>
              <span className='type__qty'>
                {imageMessages.length + videoMessages.length}
              </span>
            </div>
          </div>
          <div className='type__wrapper'>
            <BsFillFolderSymlinkFill />
            <div className='type__info'>
              <span className='type__title'>All links</span>
              <span className='type__qty'>{linkMessages.length}</span>
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
            qty={imageMessages.length}
            color='#CCBA89'
          >
            {imageMessages.map((imageMessage) => (
              <a
                href={imageMessage?.mediaUrl}
                download
                target='_blank'
                rel='noreferrer'
                key={imageMessage?.id}
              >
                <img
                  src={imageMessage?.mediaUrl}
                  className='room-images'
                  alt=''
                />
              </a>
            ))}
          </FileType>
          <FileType
            type='Links'
            Icon={<AiFillFile />}
            qty={linkMessages.length}
            color='#5AB0BA'
          >
            {linkMessages.map((linkMessage) => (
              <div className='room-link-container' key={linkMessage?.id}>
                <span>
                  <AiOutlineLink />
                </span>
                <a
                  href={linkMessage?.text}
                  target='_blank'
                  rel='noreferrer'
                  className='room-link'
                >
                  {linkMessage?.text}
                </a>
              </div>
            ))}
          </FileType>
          <FileType
            type='Videos'
            Icon={<AiFillPlaySquare />}
            qty={videoMessages.length}
            color='#F6A9A9'
          >
            {videoMessages.map((videoMessage) => (
              <video
                className='room-video'
                controls
                src={videoMessage?.mediaUrl}
                key={videoMessage?.id}
              >
                Video does not support!
              </video>
            ))}
          </FileType>
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
