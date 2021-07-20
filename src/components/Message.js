import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import Avatar from './Avatar';
import { formatRelativeDate } from '../utils/formatDate';

const Message = ({ displayName, text, photoURL, uid, createdAt }) => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <div
      className={clsx('Message', uid === userInfo?.uid && 'Message--author')}
    >
      <Avatar size={35} src={photoURL} hasBorder title={displayName} />
      <div
        className='Message__list'
        title={formatRelativeDate(createdAt?.seconds || 1)}
      >
        {/* <div className='Message__content '>
          Content
        </div> */}
        <div className='Message__content Message__content--first'>{text}</div>
      </div>
    </div>
  );
};

export default Message;
