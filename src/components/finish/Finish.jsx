import React from "react";
import "./finish.scss";

export default function Finish({ startNewGame, score, closeMenu }) {
  return (
    <div className="finish">
      <h1>Good job!</h1>
      <div className="final-score">
        <div className="final-score">You've earned {score} points</div>
        <div>
          {" "}
          <button className="finish__button" onClick={startNewGame}>
            Play again
          </button>
        </div>
        <button className="finish__button" onClick={closeMenu}>
          cancel
        </button>
      </div>
    </div>
  );
}
