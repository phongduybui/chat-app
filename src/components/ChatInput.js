import React, { useEffect, useState, useRef } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { MdAttachFile, MdTagFaces } from 'react-icons/md';
import { IoPaperPlane } from 'react-icons/io5';
import { addDocument } from '../firebase/services';

const ChatInput = ({ userInfo, roomId }) => {
  const [textMessage, setTextMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  const emojiPicker = useRef(null);
  const btnEmojiRef = useRef(null);

  const onEmojiChosen = (e) => {
    setTextMessage((textMessage) => `${textMessage} ${e.native}`);
  };

  const handleToggleEmojiMenu = (e) => {
    e.preventDefault();
    setShowEmoji(!showEmoji);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (textMessage && userInfo) {
      console.log('Submit: ', textMessage);
      addDocument('messages', {
        text: textMessage,
        uid: userInfo.uid,
        displayName: userInfo.displayName,
        roomId,
        photoURL: userInfo.photoURL,
      });

      setTextMessage('');
    }
  };

  useEffect(() => {
    const handleCloseEmojiMenu = (e) => {
      if (
        emojiPicker.current &&
        btnEmojiRef.current &&
        !emojiPicker.current.contains(e.target) &&
        !btnEmojiRef.current.contains(e.target)
      ) {
        setShowEmoji(false);
      }
    };
    document.addEventListener('click', handleCloseEmojiMenu);
    return () => document.removeEventListener('click', handleCloseEmojiMenu);
  }, []);

  return (
    <form className='ChatInput' onSubmit={handleFormSubmit}>
      <input
        type='text'
        placeholder='Write your message...'
        value={textMessage}
        onChange={(e) => setTextMessage(e.target.value)}
      />
      <div className='ChatInput__action-group'>
        <button
          type='button'
          className='btn btn__secondary'
          onClick={handleToggleEmojiMenu}
          ref={btnEmojiRef}
        >
          <MdTagFaces />
        </button>
        <button type='button' className='btn btn__secondary'>
          <MdAttachFile />
        </button>
        <button type='submit' className='btn btn__send'>
          <IoPaperPlane />
        </button>
      </div>
      <span
        className='Picker'
        style={{ display: showEmoji ? 'inline' : 'none' }}
        ref={emojiPicker}
      >
        <Picker
          onSelect={onEmojiChosen}
          showPreview={false}
          showSkinTones={false}
        />
      </span>
    </form>
  );
};

export default ChatInput;
