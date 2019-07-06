import React from "react";
import "./App.css";

function getRealTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const time = hours.toString() + ":" + minutes.toString();
  return time;
}

function parseIntArray(arrayStr) {
  const arrayInt = arrayStr.map(item => parseInt(item));
  return arrayInt;
}

function formatHoursEnding(hours) {
  const zero = [1, 21];
  const a = [2, 3, 4, 22, 23, 24];

  if (hours === 0) return "";
  else if (zero.includes(hours)) return hours + " час ";
  else if (a.includes(hours)) return hours + " часа ";
  else return hours + " часов ";
}

function formatMinutesEnding(minutes) {
  const y = [1, 21, 31, 41, 51];
  const s = [2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54];

  if (minutes === 0) return "";
  else if (y.includes(minutes)) return minutes + " минуту ";
  else if (s.includes(minutes)) return minutes + " минуты ";
  else return minutes + " минут ";
}

function calcTimeDifference(realTime, busTime) {
  let timeDiff;

  if (realTime === undefined || busTime === undefined) timeDiff = "Error";
  else {
    const [hoursReal, minutesReal] = parseIntArray(realTime.split(":"))
    const [hoursBus, minutesBus] = parseIntArray(busTime.split(":"));

    timeDiff = (hoursBus - hoursReal) * 60 + minutesBus - minutesReal;

    if (timeDiff > 0) {
      const sum = (hoursBus - hoursReal) * 60 + minutesBus - minutesReal;
      const hours = Math.floor(sum / 60);
      const minutes = sum % 60;

      timeDiff = formatHoursEnding(hours) + formatMinutesEnding(minutes);
    } else {
      const sum = 1440 - hoursReal * 60 - minutesReal + hoursBus * 60 + minutesBus;
      const hours = Math.floor(sum / 60);
      const minutes = sum % 60;

      timeDiff = formatHoursEnding(hours) + formatMinutesEnding(minutes);
    }
  }
  return timeDiff;
}

function getClock() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  return `${hours}:${minutes}:${seconds}`;
}

function useRefresher(getValue, interval) {
  const [value, setValue] = React.useState(getValue());

  React.useEffect(() => {
    const timerID = setInterval(() => {
      tick();
      clearInterval(timerID);
    }, interval);
  });
  function tick() {
    setValue(getValue());
  }
  return value;
}

export function Clock() {
  const clock = useRefresher(getClock, 1000);
  return <label className="ClockSize"> {clock} </label>;
}

function calcMinutes(time) {
  const [hours, minutes] = parseIntArray(time.split(":"));
  return hours * 60 + minutes;
}

export function getNearBuses(realTime, timeToBus) {
  const arrayMinutes = timeToBus.map(item => calcMinutes(item))
  const nearTimeToBus = arrayMinutes.indexOf(
    arrayMinutes.find(item => item > calcMinutes(realTime))
  );

  if (timeToBus[nearTimeToBus] === undefined)
    return [timeToBus[0], timeToBus[1], timeToBus[2]];
  else if (timeToBus[nearTimeToBus + 1] && timeToBus[nearTimeToBus + 2])
    return [
      timeToBus[nearTimeToBus],
      timeToBus[nearTimeToBus + 1],
      timeToBus[nearTimeToBus + 2]
    ];
  else if (timeToBus[nearTimeToBus + 1] && timeToBus[nearTimeToBus + 2] === undefined)
    return [timeToBus[nearTimeToBus], timeToBus[nearTimeToBus + 1], timeToBus[0]];
  else if (
    timeToBus[nearTimeToBus + 1] === undefined &&
    timeToBus[nearTimeToBus + 2] === undefined
  )
    return [timeToBus[nearTimeToBus], timeToBus[0], timeToBus[1]];
}

export function DirectionSelect({
  onFirstCityChange,
  onSecondCityChange,
  selectedFrom,
  selectedTo,
  arrayFrom,
  arrayTo
}) {
  return (
    <div>
      <Select
        options={arrayFrom}
        onChange={onFirstCityChange}
        value={selectedFrom}
      />
      <span> -> </span>
      <Select
        options={arrayTo}
        onChange={onSecondCityChange}
        value={selectedTo}
      />
    </div>
  );
}

export function Select({ onChange, value, options }) {
  return (
    <select className="select-css" onChange={onChange} value={value}>
      {options.map(item => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export function BusTable({ busTimes, from, to }) {
  useRefresher(getClock, 1000)
  const realTime = getRealTime();
  const bus = busTimes.filter(item => item.from === from && item.to === to)[0];
  const [firstBus, secondBus, thirdBus] = getNearBuses(realTime, bus.times);
  
  return (
    <div>
      1. Ближайший рейс через {calcTimeDifference(realTime, firstBus)} в {firstBus} <br/>
      2. Рейс через {calcTimeDifference(realTime, secondBus)} в {secondBus} <br/>     
      3. Рейс через {calcTimeDifference(realTime, thirdBus)} в {thirdBus} <br/>   
    </div>
  );
}
