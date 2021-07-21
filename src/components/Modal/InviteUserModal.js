import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../firebase/config';
import { fetchUserList } from '../../firebase/services';
import { toast } from 'react-toastify';
import Avatar from '../Avatar';
import Modal from './Modal';

const InviteUserModal = ({ currentMembers, ...props }) => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [isVisibleSelectBox, setIsVisibleSelectBox] = useState(false);

  const selectBoxRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (selectedUsers) {
      const roomRef = db.collection('rooms').doc(props.roomId);

      roomRef.update({
        members: [...currentMembers, ...selectedUsers.map((user) => user.uid)],
      });
      setSelectedUsers([]);
      props.onClose();
      toast.dark('✔️ Successfully added users!');
      return;
    }
  };

  const handleSelectUser = (user) => {
    const checkUser = selectedUsers.find((u) => u.uid === user.uid);
    if (checkUser) {
      setSelectedUsers(selectedUsers.filter((u) => u.uid !== user.uid));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleRemoveSelectUser = (uid) => {
    setSelectedUsers(selectedUsers.filter((u) => u.uid !== uid));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);

    return () => clearTimeout(timer);
  }, [term]);

  useEffect(() => {
    if (debouncedTerm) {
      setIsVisibleSelectBox(true);
      fetchUserList(debouncedTerm, currentMembers)
        .then((users) => {
          setUsers(users);
        })
        .catch((err) => console.log(err));
    }
  }, [debouncedTerm, currentMembers]);

  useEffect(() => {
    const onBodyClick = (event) => {
      if (
        selectBoxRef.current &&
        !selectBoxRef.current.contains(event.target)
      ) {
        setIsVisibleSelectBox(false);
      }
    };

    // Them {capture: true} de chay dc
    document.addEventListener('click', onBodyClick, { capture: true });

    return () =>
      document.removeEventListener('click', onBodyClick, { capture: true });
  }, []);

  return (
    <Modal {...props} header='Invite your friends'>
      <form className='InviteUserModal' onSubmit={handleFormSubmit}>
        <div className='content'>
          <div className='seleted-users'>
            {selectedUsers.map((user) => (
              <span className='user' key={user.uid}>
                <Avatar src={user.photoURL} size={14} />
                <span className='display-name'>{user.displayName}</span>
                <span
                  className='btn-remove'
                  onClick={() => handleRemoveSelectUser(user.uid)}
                >
                  &times;
                </span>
              </span>
            ))}
          </div>
          <label>Search:</label>
          <input
            type='text'
            placeholder='Search for user ...'
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />

          {isVisibleSelectBox && (
            <div className='list-option' ref={selectBoxRef}>
              {users.map((user) => (
                <div
                  className='option'
                  key={user.uid}
                  onClick={() => handleSelectUser(user)}
                >
                  <Avatar src={user.photoURL} size={28} />
                  <span className='display-name'>{user.displayName}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='action'>
          <button type='button' onClick={props.onClose} className='btn-cancel'>
            Cancel
          </button>
          <button type='submit' className='btn-ok'>
            OK
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default InviteUserModal;
