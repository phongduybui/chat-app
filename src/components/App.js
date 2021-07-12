import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChatPage from '../pages/ChatPage';
import Sidebar from './Sidebar';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Sidebar />
        <main>
          <Switch>
            <Route path='/' component={ChatPage} exact />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
