import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Clock, BusTable } from "./TestLab.js";
import { DirectionSelect } from "./components/DirectionSelect.js";

export function App() {
  const [firstCity, setFirstCity] = useState("Иваново");
  const [secondCity, setSecondCity] = useState("Палех");
  const [json, setJson] = useState();

  if (!json) {
    fetch("/db.json")
      .then(res => res.json())
      .then(data => {
        setJson(data);
      });

    return (
      <div className="App-header">
        Пожалуйста подождите, идёт загрузка!
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }

  const departurePoints = [];
  json.map(item => {
    if (!departurePoints.includes(item.from)) departurePoints.push(item.from);
  });

  const arrivalPoints = [];
  json.map(item => {
    if (!arrivalPoints.includes(item.to)) arrivalPoints.push(item.to);
  });

  return (
    <div className="App">
      <header className="App-header">
        <Clock />
        <DirectionSelect
          arrayFrom={departurePoints}
          arrayTo={arrivalPoints}
          selectedFrom={firstCity}
          selectedTo={secondCity}
          onFirstCityChange={event => {
            const newValueCity = event.target.value;
            setFirstCity(newValueCity);
            if (newValueCity === secondCity) setSecondCity(firstCity);
          }}
          onSecondCityChange={event => {
            const newValueCity = event.target.value;
            setSecondCity(newValueCity);
            if (newValueCity === firstCity) setFirstCity(secondCity);
          }}
        />
        <BusTable busTimes={json} from={firstCity} to={secondCity}  />
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
