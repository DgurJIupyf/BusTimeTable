import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Clock2, SuuuuuperTest, DivCenter} from './TestLab.js';

export function App() {
  const [firstCity, setFirstCity] = useState('Ivanovo');
  const [secondCity, setSecondCity] = useState('Palekh');

  fetch('/db.json')
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
  
  return (
    <div className="App">
      <header className="App-header">
      <Clock2 />
      <DivCenter
        from={firstCity}
        to={secondCity} 
        onFirstCityChange={(event) => setFirstCity(event.target.value)}
        onSecondCityChange={(event) => setSecondCity(event.target.value)}
      />
      <SuuuuuperTest to={secondCity} from={firstCity} />
      <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
