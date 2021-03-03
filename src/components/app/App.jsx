import React, { useState, useEffect } from "react";
import CardBoard from "../card-board/CardBoard";
import initializeDeck from "../deck/Deck";
import './app.scss';

export default function App() {
  const [flipped, setFlipped] = useState([]);
  const [cards, setCards] = useState([]);
  const [guessed, setguessed] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [points, setPoints] = useState(0);
  const [moves, setMoves] = useState(0);

  const audio = new Audio("./assets/audio/sound.mp3");
  const matchAudio = new Audio("./assets/audio/ok.mp3");

  useEffect(() => {
    setCards(initializeDeck());
  }, []);

  useEffect(() => {
    preloadImages();
  }, cards);

  //   useEffect(() => {
  //     const resizeListener = window.addEventListener("resize", resizeBoard);
  //     return () => window.removeEventListener("resize", resizeListener);
  //   });

  const handleClick = (id) => {
    audio.play();
    setMoves(moves +1);
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped([id]);
      setDisabled(false);
    } else {
      if (sameCardClicked(flipped, id)) return;
      setFlipped([flipped[0], id]);
      if (isMatch(id)) {
          setPoints(points+100);
        setguessed([...guessed, flipped[0], id]);
        resetCards();
        matchAudio.play();
      } else {
          setPoints(points === 0 ? 0 : points -10);
        setTimeout(resetCards, 1000);
        
      }
    }
  };
  const sameCardClicked = (id) => flipped.includes(id);

  const resetCards = () => {
    audio.play();
    setFlipped([]);
    setDisabled(false);
  };

  const preloadImages = () => {
    cards.map((card) => {
      const src = `./assets/travel/${card.type}.jpg`;
      new Image().src = src;
    });
    
  };

  const isMatch = (id) => {
    const clickedCard = cards.find((card) => card.id === id);
    const flippedCard = cards.find((card) => flipped[0] === card.id);
    return flippedCard.type === clickedCard.type;
  };

  return (
    <div>
      <h2>Memory Game</h2>
      <CardBoard

        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        guessed={guessed}
      />
      <div className="points">
          Points : {points}
      </div>
      <div className="moves">
        Total moves : {moves}
      </div>
    </div>
  );
}
