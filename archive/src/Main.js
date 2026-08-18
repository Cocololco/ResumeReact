// src/Main.js
import React from 'react';
import Navbar from './components/Navbar';

const Main = ({children}) => {
  return (
    <div>
      <Navbar />
      <div className="container" style={{ paddingTop: '70px' }}>
        {children}
      </div>
    </div>
  );
};

export default Main;
