import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')

);
