import React from "react";
import "./bestScore.scss";

export default function BestScore({ gameData }) {

  return (
    <div className="best-score__wrapper">
      <h1>Best Score Ever</h1>
      <div className="score-data">{gameData}</div>
    </div>
  );
}
