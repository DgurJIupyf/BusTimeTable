import React from "react";
import "./App.css";

function RealTime() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  var time = hours.toString() + ":" + minutes.toString();
  return time;
}

function parseIntArray(ArrayStr) {
  const ArrayInt = ArrayStr.map(item => parseInt(item));
  return ArrayInt;
}

function EndHours(NumHours) {
  const zero = [1, 21];
  const a = [2, 3, 4, 22, 23, 24];

  if (NumHours === 0) return "";
  else if (zero.includes(NumHours)) return NumHours + " час ";
  else if (a.includes(NumHours)) return NumHours + " часа ";
  else return NumHours + " часов ";
}

function EndMinuts(NumMinuts) {
  const zero = [1, 21, 31, 41, 51];
  const a = [2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54];
  if (NumMinuts === 0) return "";
  else if (zero.includes(NumMinuts)) return NumMinuts + " минуту ";
  else if (a.includes(NumMinuts)) return NumMinuts + " минуты ";
  else return NumMinuts + " минут ";
}

function TimeCalc(Time1, Time2) {
  var DiffTime;

  if (Time1 === undefined || Time2 === undefined) DiffTime = "Error";
  else {
    var CalcRealTime = parseIntArray(Time1.split(":"));
    var CalcTimeToBus = parseIntArray(Time2.split(":"));

    DiffTime =
      (CalcTimeToBus[0] - CalcRealTime[0]) * 60 +
      CalcTimeToBus[1] -
      CalcRealTime[1];
    if (DiffTime > 0) {
      const Summ =
        (CalcTimeToBus[0] - CalcRealTime[0]) * 60 +
        CalcTimeToBus[1] -
        CalcRealTime[1];
      const Housrs = Math.floor(Summ / 60);
      const Minutes = Summ % 60;

      DiffTime = EndHours(Housrs) + EndMinuts(Minutes);
    } else {
      const Summ =
        1440 -
        CalcRealTime[0] * 60 -
        CalcRealTime[1] +
        CalcTimeToBus[0] * 60 +
        CalcTimeToBus[1];
      const Housrs = Math.floor(Summ / 60);
      const Minutes = Summ % 60;

      DiffTime = EndHours(Housrs) + EndMinuts(Minutes);
    }
  }
  return DiffTime;
}

function clock() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  var str = hours + ":" + minutes + ":" + seconds;
  return str;
}

function TimeSecond(currentDate, interval) {
  const [date, setDate] = React.useState(currentDate());

  React.useEffect(() => {
    var timerID = setInterval(() => {
      tick();
      clearInterval(timerID);
    }, interval);
  });
  function tick() {
    setDate(currentDate());
  }
  return date;
}

export function Clock2() {
  const date = TimeSecond(clock, 1000);
  return <label className="ClockSize"> {date} </label>;
}

export function GetDateToBus(RealT, TToBus) {
  function RealNumberMinuts() {
    const RealMinArr = parseIntArray(RealT.split(":"));
    const RealMin = RealMinArr[0] * 60 + RealMinArr[1];

    return RealMin;
  }
  function ToBusNumberMinuts() {
    const ToBusNumArr = TToBus.map(item => {
      const OnlyNum = parseIntArray(item.split(":"));

      const OnlySumNum = OnlyNum[0] * 60 + OnlyNum[1];
      return OnlySumNum;
    });
    return ToBusNumArr;
  }
  const NearTimeToBus = ToBusNumberMinuts().indexOf(
    ToBusNumberMinuts().find(item => item > RealNumberMinuts())
  );

  if (TToBus[NearTimeToBus] === undefined)
    return [TToBus[0], TToBus[1], TToBus[2]];
  else if (TToBus[NearTimeToBus + 1] && TToBus[NearTimeToBus + 2])
    return [
      TToBus[NearTimeToBus],
      TToBus[NearTimeToBus + 1],
      TToBus[NearTimeToBus + 2]
    ];
  else if (TToBus[NearTimeToBus + 1] && TToBus[NearTimeToBus + 2] === undefined)
    return [TToBus[NearTimeToBus], TToBus[NearTimeToBus + 1], TToBus[0]];
  else if (
    TToBus[NearTimeToBus + 1] === undefined &&
    TToBus[NearTimeToBus + 2] === undefined
  )
    return [TToBus[NearTimeToBus], TToBus[0], TToBus[1]];
}

export function DivCenter({
  onFirstCityChange,
  onSecondCityChange,
  selectedFrom,
  selectedTo,
  arrayFrom,
  arrayTo
}) {
  return (
    <div>
      <ComboBox
        options={arrayFrom}
        onChange={onFirstCityChange}
        value={selectedFrom}
      />
      <span> -> </span>
      <ComboBox
        options={arrayTo}
        onChange={onSecondCityChange}
        value={selectedTo}
      />
    </div>
  );
}

export function ComboBox({ onChange, value, options }) {
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

export function SuuuuuperTest({ JsonDataBase, from, to }) {
  if (from === to) return <div>Выберите правильное направление</div>;
  else {
    const bus = JsonDataBase.filter(
      item => item.from === from && item.to === to
    )[0];
    const filtertime = GetDateToBus(RealTime(), bus.times);

    return (
      <div>
        1. Ближайший рейс через {TimeCalc(RealTime(), filtertime[0])} в{" "}
        {filtertime[0]} <br></br>
        2. Рейс через {TimeCalc(RealTime(), filtertime[1])} в {filtertime[1]}
        <br></br>
        3. Рейс через {TimeCalc(RealTime(), filtertime[2])} в {filtertime[2]}
        <br></br>
      </div>
    );
  }
}
