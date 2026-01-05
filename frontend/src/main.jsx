import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import consola from 'consola';

consola.level = import.meta.env.VITE_LOG_LEVEL || "debug";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);