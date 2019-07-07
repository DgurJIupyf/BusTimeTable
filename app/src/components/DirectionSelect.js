import React from "react";

export function DirectionSelect({
  onFirstCityChange,
  onSecondCityChange,
  selectedFrom,
  selectedTo,
  arrayFrom,
  arrayTo
}) {
  return (
    <div>
      <Select
        options={arrayFrom}
        onChange={onFirstCityChange}
        value={selectedFrom}
      />
      <span> -> </span>
      <Select
        options={arrayTo}
        onChange={onSecondCityChange}
        value={selectedTo}
      />
    </div>
  );
}

export function Select({ onChange, value, options }) {
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