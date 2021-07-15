import React, { useEffect, useState, useRef } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { MdAttachFile, MdTagFaces } from 'react-icons/md';
import { IoPaperPlane } from 'react-icons/io5';

const ChatInput = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const emojiPicker = useRef(null);
  const btnEmojiRef = useRef(null);

  const onEmojiChosen = (event, emojiObject) => {
    // setChosenEmoji(emojiObject);
    console.log(emojiObject);
  };

  const handleToggleEmoji = (e) => {
    e.preventDefault();
    setShowEmoji(!showEmoji);
  };

  useEffect(() => {
    const handleCloseEmoji = (e) => {
      if (
        emojiPicker.current &&
        btnEmojiRef.current &&
        !emojiPicker.current.contains(e.target) &&
        !btnEmojiRef.current.contains(e.target)
      ) {
        setShowEmoji(false);
      }
    };
    document.addEventListener('click', handleCloseEmoji);
    return () => document.removeEventListener('click', handleCloseEmoji);
  }, []);

  return (
    <form className='ChatInput'>
      <input type='text' placeholder='Write your message...' />
      <div className='ChatInput__action-group'>
        <button
          className='btn btn__secondary'
          onClick={handleToggleEmoji}
          ref={btnEmojiRef}
        >
          <MdTagFaces />
        </button>
        <button className='btn btn__secondary'>
          <MdAttachFile />
        </button>
        <button className='btn btn__send'>
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
