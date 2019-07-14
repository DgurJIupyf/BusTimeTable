import { parseIntArray } from "../utils/parsing";

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