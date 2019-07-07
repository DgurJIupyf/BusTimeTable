import React from "react";
import "./App.css";

export function getRealTime() {
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

export function calcTimeDifference(realTime, busTime) {
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

export function useRefresher(getValue, interval) {
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