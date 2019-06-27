import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Clock2, SuuuuuperTest, ComboBox, ComboBox2} from './TestLab.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <ComboBox id="from"></ComboBox> <ComboBox2></ComboBox2>
      <Clock2></Clock2>
      <SuuuuuperTest></SuuuuuperTest>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
