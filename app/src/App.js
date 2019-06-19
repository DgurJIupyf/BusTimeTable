import React from 'react';
import logo from './logo.svg';
import './App.css';

const Palekh = "Палех"
const Ivanovo = "Иваново"

const TimeToBus = ["13:20", "13:30", "13:45", "13:10", "13:15", "13:43"]
var RealTime = "13:00"

function TimeCalc (Time1,Time2) {
  const HoursRealTime = parseInt(Time1.slice(0, 2))
  const MinutsRealTime = parseInt(Time1.slice(3, 5))
  const HoursTimeToBus = parseInt(Time2.slice(0, 2))
  const MinutsTimeToBus = parseInt(Time2.slice(3, 5))
  const DataRealtime = new Date (2000, 10, 10, HoursRealTime, MinutsRealTime)
  const DataTimeToBus = new Date (2000, 10, 10, HoursTimeToBus, MinutsTimeToBus)
  const DiffTime = (DataTimeToBus - DataRealtime)/1000/60
  return DiffTime
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <label>{Ivanovo} -> {Palekh} <br></br> 
      1. Ближайший рейс через {TimeCalc(RealTime, TimeToBus[0])} минут в {TimeToBus[0]}<br></br>
      2. Рейс через {TimeCalc(RealTime, TimeToBus[1])} минут в {TimeToBus[1]}<br></br>
      3. Рейс через {TimeCalc(RealTime, TimeToBus[2])} минут в {TimeToBus[2]}<br></br>
      {Palekh} -> {Ivanovo} <br></br> 
      1. Ближайший рейс через {TimeCalc(RealTime, TimeToBus[3])} минут в {TimeToBus[3]}<br></br>
      2. Рейс через {TimeCalc(RealTime, TimeToBus[4])} минут в {TimeToBus[4]}<br></br>
      3. Рейс через {TimeCalc(RealTime, TimeToBus[5])} минут в {TimeToBus[5]}<br></br>
      </label>
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
