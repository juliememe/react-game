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
        <div> Wanna see the best score? </div>
        <div className="finish__buttons">
          <button className="yep" onClick={showBestScore}>
            yep
          </button>
          <button className="no" onClick={closeMenu}>
            nope
          </button>
        </div>
        <BestScore />
      </div>
    </div>
  );
}
