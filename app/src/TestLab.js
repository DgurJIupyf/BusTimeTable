import React from 'react';
import './App.css';

const TimeToBus2 = [
  {
  "from": "Иваново",
  "to": "Палех",
  "times": ["00:00", "00:01", "00:59", "01:00", "01:01", "01:59", "02:00", "02:01",
  "02:59", "03:00", "03:01", "03:59", "17:30", "19:00", "19:30", "19:50"]
  }, 
  {
    "from": "Палех",
    "to": "Иваново",
    "times": ["07:59", "08:00", "08:01", "08:59", "09:00", "09:01", "09:59", 
    "10:00", "10:01", "10:59", "11:00", "11:01", "11:59", "12:00", "12:01", "12:59", "13:00", "13:01",
    "13:59", "14:00", "14:01", "14:59", "15:00", "18:00"]
  },
  {
    "from": "Шуя",
    "to": "Палех",
    "times": ["13:00", "00:00", "00:01", "00:59", "01:00", "01:01", "01:59", "02:00", "02:01",
    "02:59", "03:00", "03:01", "03:59"]
  },
  {
    "from": "Тверь",
    "to": "Палех",
    "times": ["13:00", "00:00", "00:01", "00:59", "01:00", "01:01", "01:59", "02:00", "02:01",
    "02:59", "03:00", "03:01", "03:59"]
  }
]

function RealTime(){
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var time = hours.toString() + ":" + minutes.toString()
    return time
}
function parseIntArray(ArrayStr) {
  const ArrayInt = ArrayStr.map(item => parseInt(item)) 
  return ArrayInt
}

function TimeCalc (Time1,Time2) {
    var DiffTime
    if (Time1 === undefined || Time2 === undefined) {
      DiffTime = "Error"
    }
    else {
      var CalcRealTime = parseIntArray(Time1.split(":"))
      var CalcTimeToBus = parseIntArray(Time2.split(":"))
      DiffTime = (CalcTimeToBus[0] - CalcRealTime[0])*60 + CalcTimeToBus[1] - CalcRealTime[1]
    }
    return DiffTime
}

function clock(){
  var date = new Date()
	var hours = date.getHours()
	var minutes = date.getMinutes()
	var seconds = date.getSeconds();   

	if(hours < 10)
		hours = "0" + hours
	if(minutes < 10)
		minutes = "0" + minutes
	if(seconds < 10)
		seconds = "0" + seconds

  var str = hours + ":" + minutes + ":" + seconds;
  return str
}

function TimeSecond(currentDate, interval) {
    const [date, setDate] = React.useState(currentDate);  
    React.useEffect(() => {
      var timerID = setInterval(() => {
		  tick()
		  clearInterval(timerID);
		}, interval );
     });    
    function tick() {
      setDate(clock());
    }  
    return date;
}

export function Clock2() {
  const date = TimeSecond(clock(), 1000)
  return (<label className="ClockSize"> {date} </label>)
}

//---------------------------------------------------------------------------------------------------------------

export function GetDateToBus (RealT, TToBus) { 
  function RealNumberMinuts () {
    const RealMinArr = parseIntArray(RealT.split(":"))
    const RealMin = RealMinArr[0]*60 + RealMinArr[1]
    return RealMin
  }
  function ToBusNumberMinuts () { 
    const ToBusNumArr = TToBus.map(item => {
      const OnlyNum = parseIntArray(item.split(":"))
      const OnlySumNum = OnlyNum[0]*60 + OnlyNum[1]
      return OnlySumNum
    })
    return ToBusNumArr
  }
  const NearTimeToBus = ToBusNumberMinuts().indexOf(ToBusNumberMinuts().find(item => item > RealNumberMinuts ()))
  if (TToBus[NearTimeToBus] === undefined)
    return [TToBus[0],TToBus[1],TToBus[2]]
  else if (TToBus[NearTimeToBus+1] && TToBus[NearTimeToBus+2]) 
    return [TToBus[NearTimeToBus],TToBus[NearTimeToBus+1],TToBus[NearTimeToBus+2]]
  else if (TToBus[NearTimeToBus+1] && TToBus[NearTimeToBus+2] === undefined)
    return [TToBus[NearTimeToBus],TToBus[NearTimeToBus+1],TToBus[0]]
  else if (TToBus[NearTimeToBus+1] === undefined && TToBus[NearTimeToBus+2] === undefined)
    return [TToBus[NearTimeToBus],TToBus[0],TToBus[1]]
}

export function DivCenter () {
  return (<div> {ComboBox()}<label id='from'> -> </label> {ComboBox2()} </div>)
}

export function ComboBox() {
  return (
    <select id='from' className='select-css' onChange={function OnSelectionChange (select) {
        //var selectedOption = select.options[select.selectedIndex];
        alert ("The selected option is ");
        console.log(select)
    }
    }>
      <option value='1'> Иваново </option>
      <option value='2'> Палех </option>
      <option value='3'> Шуя </option>
    </select>   
  )
}

export function ComboBox2() {
  return (
    <select id='to' className='select-css'>
      <option value='1'> Иваново </option>
      <option value='2'> Палех </option>
      <option value='3'> Шуя </option>
    </select>   
  )
}

export function SuuuuuperTest() {  
  const IndexValue1 = ComboBox2("Иваново")
  //const IndexValue2 = ComboBox2().options.selectedIndex
  //const text1 = ComboBox().options[IndexValue1].text
  //const text2 = ComboBox2().options[IndexValue2].text
  //console.log(IndexValue1/*, IndexValue2, text1, text2*/)
  const bus = TimeToBus2.filter(item => item.from === 'Палех' && item.to === 'Иваново')[0]
  const filtertime = GetDateToBus (RealTime(), bus.times)

  return (<div>
    1. Ближайший рейс через {TimeCalc(RealTime(), filtertime[0])} минут в {filtertime[0]} <br></br>
    2. Рейс через {TimeCalc(RealTime(), filtertime[1])} минут в {filtertime[1]}<br></br>
    3. Рейс через {TimeCalc(RealTime(), filtertime[2])} минут в {filtertime[2]}<br></br>
  </div>
  )
}