import React, { useState } from "react";
import "./settings.scss";
import BestScore from "../best-score/BestScore";

export default function Settings({ bestScore }) {
  const [level, setLevel] = useState("");

  const bestScoreWindow = document.querySelector(".best-score__wrapper");
  // const overlay = document.querySelector(".overlay");

  const showBestScore = () => {
    bestScoreWindow.classList.toggle("show");
    // overlay.classList.toggle("show");
  };

  return (
    <div className="settings">
      <img src="./assets/Settings_ttl.png" alt="Settings" />

      <div className="settings__data">
        <div className="music"> music </div>
        <div className="sound"> sound </div>
        <div className="level">
          <div className="level-title"> level </div>

          <select
            value={level}
            name="level"
            id="level"
            className="level-select"
            onChange={(e) => {
              const selectedLevel = e.currentTarget.value;
              setLevel(selectedLevel);
              console.log(selectedLevel);
            }}
          >
            <option value="easy" className="easy">
              easy
            </option>
            <option value="medium" className="medium">
              medium
            </option>
            <option value="hard" className="hard">
              hard
            </option>
          </select>
        </div>
        <div className="reset"> best score : {bestScore}</div>
        <div className="reset">
          {" "}
          best score :
          <button className="show-best-score" onClick={showBestScore}>
            show
          </button>
          <BestScore />
        </div>
      </div>
    </div>
  );
}
