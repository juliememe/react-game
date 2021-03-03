import React from 'react';
import './header.scss';
import Settings from '../setings/Settings';

export default function Header(){


    const settings = document.querySelector('.settings');
    const overlay = document.querySelector('.overlay');

   const handleClick= ()=>{
    
    settings.classList.toggle('show');
    overlay.classList.toggle('show');
   }



    return(
        <div className="header">
            <div className="container">
        <div className="game-title">
        <img src="./assets/header.png" alt="Memorize Game" />
        
        </div>
        <button className="settings__button" onClick = {handleClick}>
            <img src="./assets/settings.png" alt="settings" className="settings__picture"/>
        </button>
        <Settings/>
        </div>
        </div>
    )
}