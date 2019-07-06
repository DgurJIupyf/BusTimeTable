import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Clock, BusTable, DirectionSelect } from "./TestLab.js";

export function App() {
  const [firstCity, setFirstCity] = useState("Иваново");
  const [secondCity, setSecondCity] = useState("Палех");
  const [Json, setJson] = useState();

  if (!Json) {
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

  const FromBD = [];
  Json.map(item => {
    if (!FromBD.includes(item.from)) FromBD.push(item.from);
  });

  const ToBD = [];
  Json.map(item => {
    if (!ToBD.includes(item.to)) ToBD.push(item.to);
  });

  console.log(FromBD, ToBD);

  return (
    <div className="App">
      <header className="App-header">
        <Clock />
        <DirectionSelect
          arrayFrom={FromBD}
          arrayTo={ToBD}
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
        <BusTable busTimes={Json} to={secondCity} from={firstCity} />
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
