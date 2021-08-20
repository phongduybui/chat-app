import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { signInAction, signOutAction } from '../redux/slices/userSlice';
import { onAuthStateChanged } from '../firebase/services';
import { ReactComponent as LoadingAnimated } from '../assets/icons/loading.svg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import history from '../history';
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import Sidebar from './Sidebar';
import RegisterPage from '../pages/RegisterPage';
import UsersPage from '../pages/UsersPage';
import SettingPage from '../pages/SettingPage';

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, photoURL, email } = user;
        dispatch(signInAction({ uid, displayName, photoURL, email }));
        setIsLoading(false);
      } else {
        // No user is signed in.
        dispatch(signOutAction());
        setIsLoading(false);
        history.push('/login');
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Router history={history}>
      <div className='App'>
        {isLoading ? (
          <div className='loading'>
            <LoadingAnimated />
          </div>
        ) : (
          <Switch>
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route>
              <Sidebar />
              <main>
                <Switch>
                  <Route path='/setting' component={SettingPage} exact />
                  <Route path='/users' component={UsersPage} exact />
                  <Route path='/:roomId?' component={ChatPage} exact />
                </Switch>
              </main>
            </Route>
          </Switch>
        )}
        <ToastContainer position='bottom-right' autoClose={3000} />
      </div>
    </Router>
  );
};

export default App;
