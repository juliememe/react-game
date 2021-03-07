import React from "react";
import "./header.scss";

export default function Header({ startNewGame }) {
  const settings = document.querySelector(".settings");
  const overlay = document.querySelector(".overlay");
  const handleClick = () => {
    console.log("im here");
    settings.classList.toggle("show");
    overlay.classList.toggle("show");
  };

  const openFullSize = () => {
    const board = document.getElementById("board");

    if (board.requestFullScreen) {
      board.requestFullScreen();
    } else if (board.mozRequestFullScreen) {
      board.mozRequestFullScreen();
    } else if (board.webkitRequestFullScreen) {
      board.webkitRequestFullScreen();
    }
  };

  return (
    <div className="header">
      <div className="container">
        <div className="game-title">
          <img src="./assets/header.png" alt="Memorize Game" />
        </div>
        <div className="buttons">
          <button className="full-size" onClick={openFullSize}></button>
          <button className="start__button" onClick={startNewGame}>
            start
          </button>
          <button className="settings__button" onClick={handleClick}></button>
          {/* <Settings bestScore={bestScore} level={level} toggleSound={toggleSound} sound={sound}/> */}
        </div>
      </div>
    </div>
  );
}
