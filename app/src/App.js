import React, { useState, useEffect } from "react";
import { DirectionSelect } from "./components/DirectionSelect.js";
import { Clock } from "./components/Clock.js";
import { BusTable } from "./components/BusTable.js";
import { Page } from "./components/Page";
import { AddInBD } from "./components/AddBD";

export function App() {
  const [firstCity, setFirstCity] = useState("Иваново");
  const [secondCity, setSecondCity] = useState("Палех");
  const [json, setJson] = useState();
  const [departurePoints, setDeparturePoints] = useState();
  const [arrivalPoints, setArrivalPoints] = useState();
  const [addData, setAddData] = useState();

  useEffect(() => {
    fetch(`http://localhost:4000/route?from=${firstCity}&to=${secondCity}`)
      .then(res => res.json())
      .then(data => {
        setJson(data);
      });
  }, [firstCity, secondCity]);

  useEffect(() => {
    fetch('http://localhost:4000/listFrom')
      .then(res => res.json())
      .then(data => {
        setDeparturePoints(data);
      });

    fetch('http://localhost:4000/listTo')
      .then(res => res.json())
      .then(data => {
        setArrivalPoints(data);
      });
  }, []);

  if (!json || !departurePoints || !arrivalPoints) {
    return (
      <Page>
        Пожалуйста подождите, идёт загрузка!
      </Page>
    );
  }

  return ( 
    <Page>
      <AddInBD
        addBD = {addData}
        onInputCkick={event => {
          const InputDate = event.target.value;
          setAddData(InputDate);
          console.log(InputDate)
        }}
      />
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
