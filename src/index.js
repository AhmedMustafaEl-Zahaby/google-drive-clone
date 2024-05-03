import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import DriveProvider from './Context/DriveContext';

ReactDOM.render(
  <DriveProvider>
  <App />
  </DriveProvider>,
  document.getElementById('root')
);
