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
  const [bestScore, setBestScore] = useState(0);
  const [gameStart, setGameStart] =useState(false);
  // const [time, setTime] =useState(0);
  // const [firstClick, setFirstClick] = useState(false);

  const audio = new Audio("./assets/audio/movements/sound.mp3");
  const matchAudio = new Audio("./assets/audio/movements/ok.mp3");

  useEffect(() => {
    setCards(initializeDeck());
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("bestScore", String({ bestScore }));
  // }, [bestScore]);

useEffect(() => {

  const checkGame = () => flipped.length === cards.length ? console.log('im here') : null;
}
  )
  
  // setBestScore(Number(localStorage.getItem("bestScore")));

  const addToLocalStorage= (bestScore) => localStorage.setItem("bestScore", String({ bestScore }));


  const handleClick = (id) => {
    audio.play();
    setGameStart(true);
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
        checkGame();
        resetCards();
        matchAudio.play();
      } else {
        setScore(score === 0 ? 0 : score - 10);
        setTimeout(resetCards, 1000);
      }
    }
  };
  const sameCardClicked = (id) => flipped.includes(id);

// const checkGame = () => cards.length === guessed.length+2 ? console.log('GAME OVER'): console.log(guessed.length, cards.length-2);
// const checkGame = () => cards.length-1 === flipped.length ? console.log('GAME OVER'): console.log('its ok');
const checkGame = () => cards.length === guessed.length+2 ? gameOver() : null;

const gameOver= () =>{

  setGameStart(false);
  setFlipped([]);
  setDisabled(false);
  setBestScore(bestScore < score ? score : bestScore);
  console.log('game over');
  alert('GAME OVER', "YOUR SCORE IS ",{score})
}

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

      <DataBar score={score} moves={moves} bestScore={bestScore}/>
      <Footer />
    </div>
  );
}
