// src/App.js
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'G-WH3NT1ZL0W' 
};
TagManager.initialize(tagManagerArgs);
function App() {
  return (
    <AppRoutes />
  );
}

export default App;
