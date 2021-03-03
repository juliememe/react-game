import React from "react";
import "./settings.scss";

export default function Settings() {
  const settings = document.querySelector(".settings");
  const overlay = document.querySelector(".overlay");
  const handleClick = () => {
    settings.classList.toggle("show");
    overlay.classList.toggle("show");
  };

  return (
    <div className="overlay" onClick={handleClick}>
      <div className="settings">
        <img src="./assets/Settings_ttl.png" alt="Settings" />
      

      <div className="settings__button">
        <div className="music"> music </div>
        <div className="sound"> sound </div>
        <div className="reset"> reset</div>
      </div>
      </div>
    </div>
  );
}
