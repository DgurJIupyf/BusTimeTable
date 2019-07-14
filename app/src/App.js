import React, { useState } from "react";
import { DirectionSelect } from "./components/DirectionSelect.js";
import { Clock } from "./components/Clock.js";
import { BusTable } from "./components/BusTable.js";
import { Page } from "./components/Page";

export function App() {
  const [firstCity, setFirstCity] = useState("Иваново");
  const [secondCity, setSecondCity] = useState("Палех");
  const [json, setJson] = useState();
  const [departurePoints, setDeparturePoints] = useState();
  const [arrivalPoints, setArrivalPoints] = useState();

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

  if (!departurePoints) {
    fetch(`http://localhost:4000/listFrom?from=${firstCity}&to=${secondCity}`)
      .then(res => res.json())
      .then(data => {
        setDeparturePoints(data);
      });

      return (
        <Page>
          Пожалуйста подождите, идёт загрузка!
        </Page>
      );
    }

  if (!arrivalPoints) {
    fetch(`http://localhost:4000/listTo?from=${firstCity}&to=${secondCity}`)
      .then(res => res.json())
      .then(data => {
        setArrivalPoints(data);
      });

      return (
        <Page>
          Пожалуйста подождите, идёт загрузка!
        </Page>
      );
    }

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
      <BusTable busTimes={json} />
    </Page>
  )
} 

export default App;
