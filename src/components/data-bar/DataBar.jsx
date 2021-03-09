import React from "react";
import "./dataBar.scss";

export default function DataBar({ score, moves, bestScore }) {
  return (
    <div className="data-bar">
      <div className="score">
        <div className="score-title">score : </div>
        <div className="score-number"> {score}</div>
      </div>
      <div className="moves">total moves : {moves}</div>
      <div className="best-score">best score : {bestScore}</div>
    </div>
  );
}
