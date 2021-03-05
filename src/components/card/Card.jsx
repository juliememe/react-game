import React from "react";
import PropTypes from "prop-types";
import "./card.scss";

export default function Card({
  disabled,
  handleClick,
  guessed,
  id,
  type,
  flipped,
  height,
  width,
}) {
  return (
    <div
      className={`flip-container ${flipped ? "flipped" : ""}`}
      style={{
        width,
        height,
      }}
      onClick={() => (disabled ? null : handleClick(id))}
    >
      <div className="flipper">
        <img
          style={{ height, width }}
          className={flipped ? "front" : "back"}
          alt={type}
          src={flipped || guessed
              ? `./assets/photo/${type}.jpg`
              : `/assets/photo/back.jpg`}
        />
      </div>
    </div>
  );
}

Card.propTypes = {
  flipped: PropTypes.bool.isRequired,
  guessed: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};
