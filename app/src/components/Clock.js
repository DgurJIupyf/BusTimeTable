import React from "react";
import { useRefresher } from "../TestLab";


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

export function Clock() {
    const clock = useRefresher(getClock, 1000);
    return <label className="ClockSize"> {clock} </label>;
}
