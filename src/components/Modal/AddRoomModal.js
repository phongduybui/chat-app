import React from 'react';
import Modal from './Modal';
import history from '../../history';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addDocument } from '../../firebase/services';
import { toast } from 'react-toastify';
import { setChatScreenMobile } from '../../redux/slices/chatScreenSlice';

const AddRoomModal = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [message, setMessage] = useState('');

  const { userInfo } = useSelector((state) => state.user);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() && desc.trim()) {
      const roomId = await addDocument('rooms', {
        name,
        desc,
        members: [userInfo?.uid],
      });
      setName('');
      setDesc('');
      setMessage('');
      props.onClose();
      toast.dark(
        <p>
          ✔️ Successfully!{' '}
          <Link style={{ color: 'lightseagreen' }} to={`/${roomId}`}>
            Go to your room!'
          </Link>
        </p>
      );
      dispatch(setChatScreenMobile('chat-content'));
      history.push(`/${roomId}`);
      return;
    }
    setMessage('Something wrong! Please enter required fields!');
  };

  return (
    <Modal {...props} header='Create chat group'>
      <form className='AddRoomModal' onSubmit={handleFormSubmit}>
        <div className='content'>
          <label>Room Name:</label>
          <input
            type='text'
            placeholder='Enter room name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Room Description:</label>
          <input
            type='text'
            placeholder='Enter room description'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          {message && <p className='error'>{message}</p>}
        </div>

        <div className='action'>
          <button type='button' onClick={props.onClose} className='btn-cancel'>
            Cancel
          </button>
          <button type='submit' className='btn-ok'>
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddRoomModal;
