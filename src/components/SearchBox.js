import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { db } from '../firebase/config';
import { fetchRoomList } from '../firebase/services';
import { setRooms } from '../redux/slices/roomSlice';

const SearchBox = () => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);

    return () => clearTimeout(timer);
  }, [term]);

  useEffect(() => {
    if (debouncedTerm) {
      fetchRoomList(debouncedTerm).then((rooms) => {
        dispatch(setRooms(rooms));
      });
    } else {
      db.collection('rooms')
        .orderBy('createdAt')
        .get()
        .then((snapshot) => {
          return snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
        })
        .then((rooms) => {
          dispatch(setRooms(rooms));
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, debouncedTerm]);

  return (
    <form className='SearchBox'>
      <input
        type='text'
        placeholder='Search...'
        className='SearchBox__input'
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button className='SearchBox__btn'>
        <BiSearch />
      </button>
    </form>
  );
};

export default SearchBox;
