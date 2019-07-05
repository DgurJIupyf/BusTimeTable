import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Clock2, SuuuuuperTest, DivCenter} from './TestLab.js';

export function App() {
  const [firstCity, setFirstCity] = useState('Ivanovo');
  const [secondCity, setSecondCity] = useState('Palekh');
  const [Json, setJson] = useState();

  fetch('/db.json')
    .then(res => res.json())
    .then(data => {
      setTimeout(() => setJson(data), 2000)
    });
  console.log(Json)

  if (!Json) {
    return (<div className="App-header">
      Пожалуйста подождите, идёт загрузка!
      <img src={logo} className="App-logo" alt="logo" />
    </div>); 
  }
  

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
      <SuuuuuperTest JsonDataBase={Json} to={secondCity} from={firstCity} />
      <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
