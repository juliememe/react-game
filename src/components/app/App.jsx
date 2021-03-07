import React, { useState, useEffect } from "react";
import CardBoard from "../card-board/CardBoard";
import DataBar from "../data-bar/DataBar";
import initializeDeck from "../deck/Deck";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Overlay from "../overlay/Overlay";
import Finish from "../finish/Finish";

// import BestScore from "../best-score/BestScore";
import "./app.scss";
// import Settings from "../settings/Settings";

export default function App({ level, handleOverlayClick }) {
  const [flipped, setFlipped] = useState([]);
  const [cards, setCards] = useState([]);
  const [guessed, setGuessed] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [sound, setSound] = useState(true);

  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem("bestScore")) || 0
  );
  const [bestScoreEver, setBestScoreEver] = useState([]);
  const finishWindow = document.querySelector(".finish");
  const overlay = document.querySelector(".overlay");

  // const [gameStart, setGameStart] = useState(false);
  const audio = new Audio("./assets/audio/movements/sound.mp3");
  const matchAudio = new Audio("./assets/audio/movements/ok.mp3");
  const start = new Audio("./assets/audio/movements/ok1.mp3");
  const win = new Audio("./assets/audio/movements/win.mp3");

  useEffect(() => {
    setCards(initializeDeck());
  }, []);

  const bestScoreWindow = document.querySelector(".best-score__wrapper");

  const addToLocalStorage = () => {
    if (score + 100 > Number(localStorage.getItem("bestScore"))) {
      return (
        localStorage.setItem("bestScore", score + 100) &&
        setBestScore(score + 100)
      );
    }

    if (bestScoreEver.length < 10) {
      const dataScore = {
        bestScore: score + 100,
        date: +new Date(),
        movement: moves,
      };
      setBestScoreEver(dataScore);
      console.log(dataScore, bestScoreEver);
      localStorage.setItem("gameData", bestScoreEver);
      console.log(bestScoreEver.length);
    }
  };

  const toggleSound = () => {
    return sound ? setSound(false) : setSound(true);
  };

  const playFlipSound = () => {
    return sound ? audio.play() : null;
  };

  const playMatchSound = () => {
    return sound ? matchAudio.play() : null;
  };

  const playStartSound = () => {
    return sound ? start.play() : null;
  };

  const playWinSound = () => {
    return sound ? win.play() : null;
  };
  const handleClick = (id) => {
    playFlipSound();
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
      playMatchSound();
      } else {
        setScore(score - 10);
        setTimeout(resetCards, 1000);
      }
    }
  };

  const startNewGame = () => {
    playStartSound();
    finishWindow.classList.remove("show");
    overlay.classList.remove("show");
    setCards([]);
    setFlipped([]);
    setGuessed([]);
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
    setTimeout(resetCards, 1500);
  };

  const sameCardClicked = (id) => flipped.includes(id);
  // const sameCardClicked = (id) => {
  //   // console.log(flipped.indexOf(id), id, flipped);
  // }; //тут косяк, не сравнивает как надо сучий сын

  const checkGame = () =>
    cards.length === guessed.length + 2 ? gameOver() : null;

  const showFinishWindow = () => {
playWinSound();
    finishWindow.classList.add("show");
    overlay.classList.add("show");
  };

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
    showFinishWindow();

    // startNewGame();
  };

  const closeMenu = () => {
    overlay.classList.remove("show");
    finishWindow.classList.remove("show");
    console.log("CLOSE");
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
    playFlipSound();
    setFlipped([]);
    setDisabled(false);
  }

  const isMatch = (id) => {
    const clickedCard = cards.find((card) => card.id === id);
    const flippedCard = cards.find((card) => flipped[0] === card.id);
    return flippedCard.type === clickedCard.type;
  };

  // const bestScoreWindow = document.querySelector(".best-score__wrapper");
  // const overlay = document.querySelector(".overlay");

  const showBestScore = () => {
    bestScoreWindow.classList.add("show");
    // overlay.classList.toggle("show");
    console.log("showbestscore");
  };
  return (
    <div className="wrapper">
      <Header
        bestScore={bestScore}
        level={level}
        startNewGame={startNewGame}
        showBestScore={showBestScore}
        toggleSound={toggleSound}
        sound={sound}
      />
      <main className="main">
        <CardBoard
          cards={cards}
          flipped={flipped}
          handleClick={handleClick}
          disabled={disabled}
          guessed={guessed}
        />

        <DataBar score={score} moves={moves} bestScore={bestScore} />
      </main>

      <Footer />
      <Finish
        startNewGame={startNewGame}
        score={score}
        closeMenu={closeMenu}
        showBestScore={showBestScore}
      />
      {/* <BestScore/> */}
      <Overlay onClick={handleOverlayClick} />
    </div>
  );
}
