import React from "react";
import { useRefresher, getClock, getRealTime, getNearBuses, calcTimeDifference } from "../TestLab";

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
  