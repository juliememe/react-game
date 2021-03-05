import React from "react";
import "./header.scss";
import Settings from "../settings/Settings";

export default function Header({ bestScore, level, startNewGame }) {
  const settings = document.querySelector(".settings");
  const overlay = document.querySelector(".overlay");

  const handleClick = () => {
    console.log("im here");
    settings.classList.toggle("show");
    overlay.classList.toggle("show");
  };

  

  return (
    <div className="header">
      <div className="container">
        <div className="game-title">
          <img src="./assets/header.png" alt="Memorize Game" />
        </div>
        <div className="buttons">
          <button className="start__button" onClick={startNewGame}>start</button>
        <button className="settings__button" onClick={handleClick}>
          
          <img
            src="./assets/settings.png"
            alt="settings"
            className="settings__picture"
          />
       </button>
        </div>
        <Settings bestScore={bestScore} level={level} />
      </div>
    </div>
  );
}
