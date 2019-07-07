import { parseIntArray } from "../utils/parsing";

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