import React, { useState, useEffect } from 'react';
import SearchUsersBox from '../components/SearchUsersBox';
import Avatar from '../components/Avatar';
import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import { BiMessageRoundedDots, BiPhoneCall } from 'react-icons/bi';
import { AiOutlineMessage } from 'react-icons/ai';
import { db } from '../firebase/config';
import { addDocument } from '../firebase/services';
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';
import history from '../history';
import { setChatScreenMobile } from '../redux/slices/chatScreenSlice';

const UsersPage = () => {
  const dispatch = useDispatch();

  const [userList, setUserList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [userSelected, setUserSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.user);
  const { roomList } = useSelector((state) => state.rooms);

  const handleUserSelected = (selectUser) => {
    setUserSelected(selectUser);
  };

  const handleMessageBtnClick = async (desUser, onMobile) => {
    setLoading(true);
    const blackListRooms = [
      `${desUser.uid}${userInfo?.uid}`,
      `${userInfo?.uid}${desUser.uid}`,
    ];

    const existRoom = roomList.find((room) =>
      blackListRooms.includes(room?.privateRoomId)
    );

    if (existRoom) {
      history.push(`/${existRoom.id}`);
      return;
    }

    const roomId = await addDocument('rooms', {
      name: `${desUser.displayName} & ${userInfo.displayName}`,
      desc: `Conversation between ${desUser.displayName} & ${userInfo.displayName}`,
      members: [desUser.uid, userInfo?.uid],
      privateRoomId: [desUser.uid, userInfo?.uid].join(''),
    });
    setLoading(false);
    if (onMobile) {
      dispatch(setChatScreenMobile('chat-content'));
    }
    history.push(`/${roomId}`);
  };

  useEffect(() => {
    const getUsers = () => {
      let usersRef = db.collection('users');
      if (keyword) {
        usersRef = usersRef.where(
          'keywords',
          'array-contains',
          keyword.toLowerCase()
        );
      }
      usersRef
        .get()
        .then((snapshot) => {
          const users = snapshot.docs.map((doc) => ({ ...doc.data() }));
          const letters = users.map((u) => u.displayName[0].toLowerCase());
          const lettersUnique = [...new Set(letters)];
          const sortedLetters = lettersUnique.sort(
            (a, b) => a.charCodeAt(0) - b.charCodeAt(0)
          );

          const usersAlphabet = sortedLetters.map((letter) => {
            const usersMatch = users.filter(
              (u) => u.displayName[0].toLowerCase() === letter
            );

            return { firstLetter: letter, users: usersMatch };
          });
          setLoading(false);
          setUserList(usersAlphabet);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };
    setLoading(true);
    getUsers();
  }, [keyword]);

  return (
    <div className='UsersPage'>
      <div className='users'>
        <div className='users__title'>
          <h1>Users</h1>
        </div>

        <SearchUsersBox
          term={keyword}
          onTermChange={(newTerm) => setKeyword(newTerm)}
          resetTerm={() => setKeyword('')}
        />

        {loading ? (
          <div className='loader invert gutter-top' />
        ) : (
          <div className='user-list'>
            {userList.map((list) => (
              <div className='user-item' key={list.firstLetter}>
                <h3 className='letter'>{list.firstLetter.toUpperCase()}</h3>
                <div className='users-wrapper'>
                  {list.users.map((user) => (
                    <div
                      className='user'
                      onClick={() => handleUserSelected(user)}
                      key={user.uid}
                    >
                      <Avatar src={user.photoURL} size={36} />
                      <div className='wrapper-info'>
                        <h3 className='text-primary'>{user.displayName}</h3>
                        <h5 className='text-secondary'>
                          {user.email || user.providerId}
                        </h5>
                      </div>
                      <button
                        className='btn-message'
                        onClick={() => handleMessageBtnClick(user, true)}
                      >
                        <AiOutlineMessage />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='user-detail'>
        {userSelected ? (
          <>
            <Avatar src={userSelected?.photoURL} size={120} hasBorder />
            <h2 className='user-name'>{userSelected?.displayName}</h2>
            <p className='user-created-at'>
              Join at:{' '}
              {format(
                new Date(userSelected?.createdAt?.seconds * 1000 || 0),
                'PPP'
              )}
            </p>
            <div className='action'>
              <button
                onClick={() => handleMessageBtnClick(userSelected)}
                title='New Message'
              >
                <BiMessageRoundedDots />
              </button>
              <button title='Call'>
                <BiPhoneCall />
              </button>
            </div>
          </>
        ) : (
          <Logo width={120} height={120} />
        )}
      </div>
    </div>
  );
};

export default UsersPage;
