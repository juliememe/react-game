import React from 'react';
import './header.scss';

export default function Header(){

    return(
        <div className="header">
            <div className="container">
        <div className="game-title">
        <img src="./assets/header.png" alt="Meorize Game" />
        
        </div>
        <button className="settings">
            <img src="./assets/settings.png" alt="settings" className="settings"/>
        </button>
        </div>
        </div>
    )
}