import React from "react";
import { getRealTime } from "../logic/getRealTime";
import { useRefresher } from "../hooks/useRefresher";
import { getNearBuses } from "../logic/getNearBuses";
import { calcTimeDifference } from "../logic/calcTimeDifference";

export function BusTable({ busTimes }) {
    useRefresher(() => {}, 1000)
    const realTime = getRealTime();
    const [firstBus, secondBus, thirdBus] = getNearBuses(realTime, busTimes.times);
    
    return (
      <div>
        1. Ближайший рейс через {calcTimeDifference(realTime, firstBus)} в {firstBus} <br/>
        2. Рейс через {calcTimeDifference(realTime, secondBus)} в {secondBus} <br/>     
        3. Рейс через {calcTimeDifference(realTime, thirdBus)} в {thirdBus} <br/>   
      </div>
    );
  }
  