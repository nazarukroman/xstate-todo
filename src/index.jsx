import React from 'react';
import ReactDOM from 'react-dom';
import { inspect } from '@xstate/inspect';
import 'bootstrap/dist/css/bootstrap.min.css';
import { App } from './components';
import './index.css';

inspect({ iframe: false });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
