import React, { useState } from "react";

export function AddInBD () {
    const [addData, setAddData] = useState();

    return (
        <div>
            <input onChange={(e) => setAddData(e.target.value)} /> 
            <button
                onClick={() => {
                    console.log(addData);
                }}>
                    Add
            </button>
        </div>
    )
}
