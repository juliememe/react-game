import React from "react";
import "./bestScore.scss";

export default function BestScore({gameData}) {

  
  // const { id, gameScore, gameMoves} = bestScoreEver;
  
  return (
    <div className="best-score__wrapper">
      <h1>Best Score Ever</h1>
      {/* <div className="game-data__title"> */}
      {/* <div>date</div><div>score</div><div>moves</div></div> */}
      <div className="score-data">{gameData}</div>
      {/* <div className="date">{date}</div>
            <div className="score">{score}</div>
            <div className="moves">{moves}</div> */}
    </div>
  );
}
