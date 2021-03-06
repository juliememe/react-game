import React from "react";
import BestScore from "../best-score/BestScore";
import "./finish.scss";
import "../best-score/bestScore.scss";

export default function Finish({
  startNewGame,
  score,
  closeMenu,
  showBestScore,
}) {
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
        <BestScore />
      </div>
    
  );
}
