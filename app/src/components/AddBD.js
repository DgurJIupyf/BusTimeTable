import React from "react";

export function AddInBD ( { addBD, onInputCkick }) {
    return (<div>
        <input /> 
        <button onClick={onInputCkick} />
        <span>{addBD}</span>
    </div>)
}