import React from "react";
import { useRefresher, getClock } from "../TestLab";

export function Clock() {
    const clock = useRefresher(getClock, 1000);
    return <label className="ClockSize"> {clock} </label>;
}
