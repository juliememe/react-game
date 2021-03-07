import React from "react";

import "./footer.scss";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="logo">
          <a href="https://rs.school/react/">
            {" "}
            <img src="./assets/rs_school_js.svg" alt="logo" />
          </a>
        </div>
        <div className="box">
          <div className="git-name">
            <a href="https://github.com/juliememe">iuliia mazaeva</a>
          </div>
          <div className="year">2021 </div>
        </div>
      </div>
    </div>
  );
}
