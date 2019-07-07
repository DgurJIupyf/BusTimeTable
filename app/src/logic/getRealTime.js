export function getRealTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const time = hours.toString() + ":" + minutes.toString();
    return time;
}