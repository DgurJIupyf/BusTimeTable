import React from "react";
import logo from "../logo.svg";
import "./Page.css";

export function Page ({ children }) {
    return (
        <div className="App"> 
            <div className="App-header">
            {children}
            <img src={logo} className="App-logo" alt="logo" />
            </div>
        </div>
    );
}