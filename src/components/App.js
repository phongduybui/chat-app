import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Sidebar';

const App = () => {
  return (
    <div>
      <Router>
        <Sidebar />
      </Router>
    </div>
  );
};

export default App;
