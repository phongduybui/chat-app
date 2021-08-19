import React, { useState } from 'react';
import Avatar from '../components/Avatar';
import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { BiLogOut } from 'react-icons/bi';
import { signOut } from '../firebase/services';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { db, auth } from '../firebase/config';
import { signInAction } from '../redux/slices/userSlice';

const SettingPage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [name, setName] = useState(userInfo?.displayName || '');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && password && userInfo?.uid) {
      try {
        setLoading(true);
        await auth.currentUser.updateProfile({
          displayName: name,
        });
        const snapshots = await db
          .collection('users')
          .where('uid', '==', userInfo?.uid)
          .get();
        snapshots.forEach((user) => {
          let docRef = db.collection('users').doc(user.id);
          docRef
            .update({
              displayName: name,
            })
            .then(() => {
              docRef.get().then((user) => {
                const updatedUser = { ...user.data() };
                dispatch(signInAction(updatedUser));
              });
            });
        });

        // Update password (Reauthenticated first!)
        await auth.signInWithEmailAndPassword(userInfo?.email, currentPassword);
        await auth.currentUser.updatePassword(password);
        toast.success('Update profile successfull!');
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error(err.message);
      }
    } else {
      toast.warning('Please enter required fields!');
    }
  };

  return (
    <div className='SettingPage'>
      <div className='setting'>
        <div className='setting__title'>
          <h1>Profile</h1>
        </div>

        <div className='profile'>
          <div className='profile-info'>
            <Avatar src={userInfo?.photoURL} size={90} hasBorder />
            <h2 className='user-name'>{userInfo?.displayName}</h2>
            <button className='btn-logout' onClick={signOut}>
              <BiLogOut />
              Logout
            </button>
          </div>
          <form>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor='currentPassword'>Current Password</label>
            <input
              type='password'
              id='currentPassword'
              placeholder='Enter current password (*)'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <label htmlFor='password'>New Password</label>
            <div className='password-wrapper'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={password}
                placeholder='Enter new password (*)'
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEye /> : <BsEyeSlash />}
              </button>
            </div>

            <button onClick={handleSubmit} className='btn-submit'>
              {loading ? <div className='loader' /> : 'UPDATE'}
            </button>
          </form>
        </div>
      </div>
      <div className='cover'>
        <Logo width={120} height={120} />
      </div>
    </div>
  );
};

export default SettingPage;
