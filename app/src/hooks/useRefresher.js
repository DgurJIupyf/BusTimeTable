import React from "react";

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