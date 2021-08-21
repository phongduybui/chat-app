import clsx from 'clsx';
import React, { useState, useRef } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { db } from '../firebase/config';
import useClickOutside from '../hooks/useClickOutside';
import Avatar from './Avatar';

const MemberItem = ({ memUID, photoURL, displayName }) => {
  const [showAction, setShowAction] = useState(false);
  const { selectedRoom } = useSelector((state) => state.rooms);
  const ref = useRef(null);

  useClickOutside(ref, () => {
    setShowAction(false);
  });

  const handleRemoveMember = async () => {
    if (selectedRoom && memUID) {
      try {
        await db
          .collection('rooms')
          .doc(selectedRoom?.id)
          .update({
            members: selectedRoom?.members.filter((memId) => memId !== memUID),
          });
        toast.success('Remove successful');
      } catch (err) {
        toast.warn('Something wrong! Try again');
      }
    } else {
      toast.warn('Something wrong! Try again');
    }
  };

  return (
    <div className='member-wrapper'>
      <div className='member-info'>
        <Avatar size={28} src={photoURL} />
        <span className='member-name'>{displayName}</span>
      </div>
      <div className='action-wrapper'>
        <span
          className='member-action'
          onClick={() => setShowAction(!showAction)}
        >
          <BiDotsVerticalRounded fontSize={18} />
        </span>
        <button
          className={clsx('btn-remove-mem', showAction && 'visible')}
          onClick={handleRemoveMember}
          ref={ref}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default MemberItem;
