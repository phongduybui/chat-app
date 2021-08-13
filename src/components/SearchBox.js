import React, { useEffect, useState } from 'react';
import { BiSearch, BiX } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { db } from '../firebase/config';
import { fetchRoomList } from '../firebase/services';
import { setRooms } from '../redux/slices/roomSlice';

const SearchBox = ({ uid }) => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  const dispatch = useDispatch();

  const clearInput = () => {
    setDebouncedTerm('');
    setTerm('');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);

    return () => clearTimeout(timer);
  }, [term]);

  useEffect(() => {
    if (debouncedTerm && uid) {
      fetchRoomList(debouncedTerm, uid).then((rooms) => {
        dispatch(setRooms(rooms));
      });
    } else if (uid) {
      db.collection('rooms')
        .orderBy('createdAt')
        .where('members', 'array-contains', uid)
        .get()
        .then((snapshot) => {
          return snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
        })
        .then((rooms) => {
          dispatch(setRooms(rooms));
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, debouncedTerm, uid]);

  return (
    <div className='SearchBox'>
      <input
        type='text'
        placeholder='Search...'
        className='SearchBox__input'
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type='button' className='SearchBox__btn' onClick={clearInput}>
        {term ? <BiX fontSize={20} /> : <BiSearch />}
      </button>
    </div>
  );
};

export default SearchBox;
