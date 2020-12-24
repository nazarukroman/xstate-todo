import React from 'react';
import { Body } from './Body';
import logo from '../logo.svg';
import './App.css';

export function App() {
  return (
    <div className="App">
      <div className="logo-wrapper">
        <img src={logo} className="App-logo" alt="logo" />
      </div>

      <Body />
    </div>
  );
}
