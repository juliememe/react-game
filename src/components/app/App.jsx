import React, { useState, useEffect } from "react";
import CardBoard from "../card-board/CardBoard";
import DataBar from "../data-bar/DataBar";
import initializeDeck from "../deck/Deck";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./app.scss";

export default function App() {
  const [flipped, setFlipped] = useState([]);
  const [cards, setCards] = useState([]);
  const [guessed, setGuessed] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  // const [time, setTime] =useState(0);
  // const [firstClick, setFirstClick] = useState(false);

  const audio = new Audio("./assets/audio/movements/sound.mp3");
  const matchAudio = new Audio("./assets/audio/movements/ok.mp3");

  useEffect(() => {
    setCards(initializeDeck());
  }, []);

  const handleClick = (id) => {
    //   setFirstClick(true);

    // startGameTimer();
    // console.log({ firstClick });
    audio.play();

    setMoves(moves + 1);
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped([id]);
      setDisabled(false);
    } else {
      if (sameCardClicked(flipped, id)) return;
      setFlipped([flipped[0], id]);
      if (isMatch(id)) {
        setScore(score + 100);
        setGuessed([...guessed, flipped[0], id]);
        resetCards();
        matchAudio.play();
      } else {
        setScore(score === 0 ? 0 : score - 10);
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
    return cards.map((card) => {
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
      <Header />
      <CardBoard
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        guessed={guessed}
      />

      <DataBar score={score} moves={moves} />
      <Footer/>
    </div>
  );
}
