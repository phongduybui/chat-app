import React, { useState, useRef, useEffect } from 'react';
import ChatInput from './ChatInput';
import Message from './Message';
import { useSelector } from 'react-redux';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { useRouteMatch } from 'react-router';
import useFirestore from '../hooks/useFirestore';
import InviteUserModal from './Modal/InviteUserModal';

const ChatBox = () => {
  const match = useRouteMatch();
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const { roomList } = useSelector((state) => state.rooms);
  const { userInfo } = useSelector((state) => state.user);
  const selectedRoom = roomList.find((r) => r.id === match.params.roomId);

  const ref = useRef(null);

  const messagesCondition = React.useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: match.params.roomId,
    }),
    [match.params.roomId]
  );

  const messages = useFirestore('messages', messagesCondition);

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
      <div className='ChatBox__title'>
        <h2 className='h1'>{selectedRoom?.name}</h2>
        <button
          onClick={() => setOpenInviteModal(true)}
          className='ChatBox__btn'
        >
          <AiOutlineUsergroupAdd />
          <span>Invite</span>
        </button>
      </div>

      <InviteUserModal
        open={openInviteModal}
        onClose={() => setOpenInviteModal(false)}
        currentMembers={selectedRoom?.members}
        roomId={match.params.roomId}
      />

      <div className='ChatBox__wrapper-content'>
        <div className='ChatBox__messages' ref={ref}>
          {messages.map((message) => (
            <Message key={message.id} {...message} />
          ))}
        </div>
        <ChatInput userInfo={userInfo} roomId={match.params.roomId} />
      </div>
    </div>
  );
};

export default ChatBox;
