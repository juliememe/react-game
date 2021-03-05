import React from "react";

import '../settings/settings.scss';

export default function Overlay(){

    const settings = document.querySelector(".settings");
    const overlay = document.querySelector(".overlay");
  const bestScoreWindow = document.querySelector(".best-score__wrapper");

  
    const handleOverlayClick = () => {
      console.log("pararram");
      settings.classList.remove("show");
      overlay.classList.remove("show");
      bestScoreWindow.classList.remove("show");

    };

    return <div className="overlay" onClick={handleOverlayClick}>
        
    </div>
}