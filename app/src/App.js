import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Clock2, SuuuuuperTest, DivCenter} from './TestLab.js';


function App() {
  const [firstCity, setFirstCity] = useState();
  return (
    <div className="App">
      <header className="App-header">
      <Clock2></Clock2>
      <DivCenter onFirstCityChange={(event) => setFirstCity(event.target.value)}>
        
      </DivCenter>
      {firstCity}
      <SuuuuuperTest id='a2' from={firstCity}></SuuuuuperTest>
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
