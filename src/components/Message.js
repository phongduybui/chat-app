import React from 'react';
import clsx from 'clsx';
import Linkify from 'react-linkify';
import { useSelector } from 'react-redux';
import Avatar from './Avatar';
import { formatRelativeDate } from '../utils/formatDate';

const Message = ({
  displayName,
  text,
  photoURL,
  uid,
  createdAt,
  mediaUrl,
  type,
}) => {
  const { userInfo } = useSelector((state) => state.user);

  const handleImageClick = () => {};

  const renderMessage = () => {
    switch (type) {
      case 'loading':
        return (
          <div className='link-download-img'>
            <img
              onClick={handleImageClick}
              className='image-message'
              src={mediaUrl}
              alt=''
            />
          </div>
        );
      case 'video':
        return (
          <video className='video-message' controls src={mediaUrl}>
            Video does not support!
          </video>
        );
      case 'image':
        return (
          <a
            href={mediaUrl}
            target='_blank'
            download='download-image'
            rel='noreferrer'
            className='link-download-img'
          >
            <img
              onClick={handleImageClick}
              className='image-message'
              src={mediaUrl}
              alt=''
            />
          </a>
        );
      default:
        return (
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a target='blank' href={decoratedHref} key={key}>
                {decoratedText}
              </a>
            )}
          >
            {text}
          </Linkify>
        );
    }
  };

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
        <div className='Message__content Message__content--first'>
          {renderMessage()}
        </div>
      </div>
    </div>
  );
};

export default Message;
