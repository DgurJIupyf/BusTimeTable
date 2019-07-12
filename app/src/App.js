import React, { useState } from "react";
import { DirectionSelect } from "./components/DirectionSelect.js";
import { Clock } from "./components/Clock.js";
import { BusTable } from "./components/BusTable.js";
import { Page } from "./components/Page";

export function App() {
  const [firstCity, setFirstCity] = useState("Иваново");
  const [secondCity, setSecondCity] = useState("Палех");
  const [json, setJson] = useState();

  if (!json) {
    fetch(`http://localhost:4000/route?from=${firstCity}&to=${secondCity}`)
      .then(res => res.json())
      .then(data => {
        setJson(data);
      });

    return (
      <Page>
        Пожалуйста подождите, идёт загрузка!
      </Page>
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
    <Page>
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
    </Page>
  )
} 

export default App;
