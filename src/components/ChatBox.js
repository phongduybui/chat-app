import React, { useState, useRef, useEffect } from 'react';
import ChatInput from './ChatInput';
import Message from './Message';
import InviteUserModal from './Modal/InviteUserModal';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineUsergroupAdd, AiOutlineInfoCircle } from 'react-icons/ai';
import { useRouteMatch } from 'react-router';
import { setRoomModalVisible } from '../redux/slices/roomModalSlice';
import { setMessages } from '../redux/slices/messageSlice';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { setChatScreenMobile } from '../redux/slices/chatScreenSlice';
import { db } from '../firebase/config';

const ChatBox = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const { roomList } = useSelector((state) => state.rooms);
  const { userInfo } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const selectedRoom = roomList.find((r) => r?.id === match.params.roomId);

  const ref = useRef(null);

  const handleShowChatInfo = () => {
    dispatch(setChatScreenMobile('chat-info'));
    const btnShowInfo = document.querySelector(
      'div.CollapsibleBar.ChatPage__shared-files.collapse > div.CollapsibleBar__title > button'
    );
    if (btnShowInfo) {
      btnShowInfo.click();
    }
  };

  useEffect(() => {
    if (match.params.roomId) {
      let collectionRef = db.collection('messages').orderBy('createdAt');
      collectionRef = collectionRef.where('roomId', '==', match.params.roomId);
      const unsubscribe = collectionRef.onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });

        dispatch(setMessages(messages));
      });

      return unsubscribe;
    }
  }, [dispatch, match.params.roomId]);

  useEffect(() => {
    if (messages && ref?.current) {
      ref.current.scrollTo({
        behavior: 'smooth',
        top: ref.current.scrollHeight,
      });
    }
  }, [messages]);

  return (
    <div className='ChatBox'>
      {selectedRoom ? (
        <>
          <div className='ChatBox__title'>
            <div className='wrapper-btn wrapper-btn--left'>
              <button
                className='btn-change-screen'
                onClick={() => dispatch(setChatScreenMobile('chat-list'))}
              >
                <FiChevronLeft />
              </button>
              <h2 className='h1'>{selectedRoom?.name}</h2>
            </div>
            <div className='wrapper-btn'>
              <button
                onClick={() => setOpenInviteModal(true)}
                className='ChatBox__btn'
              >
                <AiOutlineUsergroupAdd />
                <span>Invite</span>
              </button>
              <button
                onClick={handleShowChatInfo}
                className='btn-change-screen'
              >
                <FiChevronRight />
              </button>
            </div>
          </div>

          <div className='ChatBox__wrapper-content'>
            <div className='ChatBox__messages' ref={ref}>
              {messages.map((message) => (
                <Message key={message.id} {...message} />
              ))}
            </div>
            <ChatInput userInfo={userInfo} roomId={match.params.roomId} />
          </div>
        </>
      ) : (
        <div className='tooltip'>
          <div className='tooltip__content'>
            <AiOutlineInfoCircle />
            <span>
              Please{' '}
              <button
                onClick={() => dispatch(setChatScreenMobile('chat-list'))}
              >
                select a room
              </button>{' '}
              or{' '}
              <button onClick={() => dispatch(setRoomModalVisible(true))}>
                create a new chat room!
              </button>
            </span>
          </div>
        </div>
      )}
      <InviteUserModal
        open={openInviteModal}
        onClose={() => setOpenInviteModal(false)}
        currentMembers={selectedRoom?.members}
        roomId={match.params.roomId}
      />
    </div>
  );
};

export default ChatBox;
