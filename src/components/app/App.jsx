import React, { useState, useEffect } from "react";
import CardBoard from "../card-board/CardBoard";
import DataBar from "../data-bar/DataBar";
import initializeDeck from "../deck/Deck";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Overlay from "../overlay/Overlay";
import "./app.scss";
// import Settings from "../settings/Settings";

export default function App({ level, handleOverlayClick }) {
  const [flipped, setFlipped] = useState([]);
  const [cards, setCards] = useState([]);
  const [guessed, setGuessed] = useState([]);
  const [disabled, setDisabled] = useState(false);
   const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem("bestScore")) || 0
  );
  const [bestScoreEver, setBestScoreEver] = useState([]);
  // const [gameStart, setGameStart] = useState(false);
  const audio = new Audio("./assets/audio/movements/sound.mp3");
  const matchAudio = new Audio("./assets/audio/movements/ok.mp3");

  useEffect(() => {
    setCards(initializeDeck());
  }, []);

  // const countNumberOfCards =()=>{
  //   setCards(initializeDeck());

  //     if(level === 'easy'){
  //       return cards.slice(0, 8);
  //     } else if (level === 'medium'){
  //         return cards.slice(0, 12);

  //       } else if(level ==="hard"){
  //         return cards.slice(0, 16);
  //       }

  //     }

  // useEffect(() => {
  //   countNumberOfCards()
  //   console.log("im right here")
  // }, [level]);

  const addToLocalStorage = () => {
    if(score + 100 > Number(localStorage.getItem("bestScore"))){
      return  localStorage.setItem("bestScore", score + 100) &&
      setBestScore(score + 100);
    }
  
 
    if (bestScoreEver.length < 10) {
      setBestScoreEver(bestScoreEver + 1);
      const dataScore = {
        bestScore: score + 100,
        date: +new Date(),
        movement: moves,
      };
      localStorage.setItem(bestScoreEver.length + 1, dataScore);
      console.log(bestScoreEver.length);
    }
  };

  // score + 100 > Number(localStorage.getItem("bestScore"))
  // ? localStorage.setItem("bestScore", score + 100) &&
  //   setBestScore(score + 100)
  // : null;

  const handleClick = (id) => {
    // countNumberOfCards();

    // console.log({ level });
    audio.play();
    // setGameStart(true);
    // console.log(gameStart);
    setMoves(moves + 1);
    setDisabled(true);
    setFlipped([id]);

    if (flipped.length === 0) {
      // console.log("first");
      // setFlipped([id]);
      setDisabled(false);
      // console.log(flipped, id);
    } else {
      if (sameCardClicked(flipped, id)) return;
      setFlipped([flipped[0], id]);
      // console.log("i'm here");
      if (isMatch(id)) {
        setScore(score + 100);
        setGuessed([...guessed, flipped[0], id]);
        checkGame();
        resetCards();
        matchAudio.play();
      } else {
        setScore(score - 10);
        setTimeout(resetCards, 1000);
      }
    }

    console.log(flipped);
    console.log(cards);
    console.log(guessed);
    console.log(disabled);
  };

  const startNewGame = () => {
    setCards(initializeDeck());
    setScore(0);
    setMoves(0);
    let arr = [];
    cards.forEach(({ id }) => {
      arr = [...arr, id];
    });
    console.log(arr);
    setFlipped(arr);
    console.log(flipped);
    setTimeout(resetCards, 2000);
    
    // cards.map((card) => flipped.push(card));
    // console.log(flipped);
  };

  // const sameCardClicked = (id) => flipped.includes(id);
  const sameCardClicked = (id) => {
    // console.log(flipped.indexOf(id), id, flipped);
  }; //тут косяк, не сравнивает как надо сучий сын

  const checkGame = () =>
    cards.length === guessed.length + 2 ? gameOver() : null;

  const gameOver = () => {
    // setGameStart(false);
    setFlipped([]);
    setDisabled(false);
    resetCards();
    initializeDeck();
    // checkScore(score);
    // setBestScore(score+100);
    // console.log(bestScore);
    addToLocalStorage();
    // console.log("game over");
    // console.log({ gameStart });
    alert("GAME OVER", "YOUR SCORE IS ", { score });
    // startNewGame();
    // console.log(localStorage.getItem("bestScore"));
    // console.log(gameStart, "start");
  };

  useEffect(() => {
    cards.map((card) => {
      const src = `./assets/travel/${card.type}.jpg`;
      new Image().src = src;
      return {
        card,
      };
    });
  }, [cards]);

  function resetCards() {
    audio.play();
    setFlipped([]);
    setDisabled(false);
  }

  const isMatch = (id) => {
    const clickedCard = cards.find((card) => card.id === id);
    const flippedCard = cards.find((card) => flipped[0] === card.id);
    return flippedCard.type === clickedCard.type;
  };

  return (
    <div className="wrapper">
      {/* <button onClick={startNewGame}>Start Game</button> */}
      <Header bestScore={bestScore} level={level} startNewGame={startNewGame} />

      <CardBoard
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        guessed={guessed}
      />

      <DataBar score={score} moves={moves} bestScore={bestScore} />
      <Footer />
      <Overlay onClick={handleOverlayClick} />
    </div>
  );
}
