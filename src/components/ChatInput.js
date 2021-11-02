import React, { useEffect, useState, useRef } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { MdAttachFile, MdTagFaces } from 'react-icons/md';
import { IoPaperPlane } from 'react-icons/io5';
import { addDocument, saveMediaMessage } from '../firebase/services';
import { toast } from 'react-toastify';

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
      addDocument('messages', {
        text: textMessage,
        uid: userInfo.uid,
        displayName: userInfo.displayName,
        roomId,
        photoURL: userInfo.photoURL,
      });
      setTextMessage('');
      return;
    }
    toast.warning('❗Please enter your text message!');
  };

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    const fileType = file.type;
    const isValidFile = fileType.match('image.*') || fileType.match('video.*');

    if (!isValidFile) {
      toast.warn('❗You can only share image or video!');
      return;
    }
    saveMediaMessage(file, roomId);
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
        className='input'
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

        <input id='input-file' type='file' onChange={handleUploadFile} hidden />
        <label htmlFor='input-file' className='btn btn__secondary'>
          <MdAttachFile />
        </label>

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
