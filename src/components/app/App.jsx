import React, { useState, useEffect } from "react";
import CardBoard from "../card-board/CardBoard";
import DataBar from "../data-bar/DataBar";
import initializeDeck from "../deck/Deck";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Overlay from "../overlay/Overlay";
import Finish from "../finish/Finish";
import Settings from "../settings/Settings";
import BestScore from "../best-score/BestScore";
import "./app.scss";

export default function App({ level, handleOverlayClick }) {
  const [flipped, setFlipped] = useState([]);
  const [cards, setCards] = useState([]);
  const [guessed, setGuessed] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [sound, setSound] = useState(true);
  // const[width, setWidth] = useState(150);
  // const [height, setHeight] = useState(220);
  // const [boardSize, setBoardSize] = useState(4);
  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem("bestScore")) || 0
  );
  // const [gameState, setGameState] = useState([]);
  const [bestScoreEver, setBestScoreEver] = useState([]);
  const finishWindow = document.querySelector(".finish");
  const overlay = document.querySelector(".overlay");
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
  };

  useEffect(() => {
    localStorage.setItem("bestScoreEver", JSON.stringify(bestScoreEver));
  }, [bestScoreEver]);

  useEffect(() => {
    const data = localStorage.getItem("bestScoreEver") || [];
    setBestScoreEver(JSON.parse(data));
  }, []);

  const addToTheBestScore = () => {
    setBestScoreEver([
      ...bestScoreEver,
      {
        id: Date.now(),
        score: score + 100,
        moves: moves,
      },
    ]);
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
    if (sameCardClicked(flipped, id)) return;
    console.log(bestScoreEver, "SCORE");

    console.log({ cards });
    playFlipSound();
    setMoves(moves + 1);
    setDisabled(true);
    setFlipped([id]);

    if (flipped.length === 0) {
      setDisabled(false);
    } else {
      setFlipped([flipped[0], id]);

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

  // const saveGameState=(id) => {
  //   setGameState([
  //     ...gameState, {
  //       id: Date.now(),
  //       score: score,
  //       moves: moves,

  //     }
  //   ])
  // }

  const sameCardClicked = (array, id) => array.includes(id);

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
    setTimeout(resetCards, 2000);
  };

  const checkGame = () =>
    cards.length === guessed.length + 2 ? gameOver() : null;

  const showFinishWindow = () => {
    playWinSound();
    finishWindow.classList.add("show");
    overlay.classList.add("show");
  };

  const gameOver = () => {
    addToTheBestScore();
    setFlipped([]);
    setDisabled(false);
    resetCards();
    initializeDeck();
    addToLocalStorage();
    showFinishWindow();
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

  const showBestScore = () => {
    bestScoreWindow.classList.add("show");
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
      <Settings
        bestScore={bestScore}
        level={level}
        toggleSound={toggleSound}
        sound={sound}
      />
      <BestScore
        gameData={bestScoreEver.map((elem) => (
          <div className="game-data" key={elem.id}>
            {" "}
            <div className="game-date">
              date:{" "}
              {new Date(+elem.id).getDate().toString().length < 2
                ? "0" + new Date(+elem.id).getDate().toString()
                : new Date(+elem.id).getDate().toString()}
              .
              {(new Date(+elem.id).getMonth() + 1).toString().length < 2
                ? "0" + (new Date(+elem.id).getMonth() + 1).toString()
                : (new Date(+elem.id).getMonth() + 1).toString()}
              . {new Date(+elem.id).getFullYear().toString()}
            </div>{" "}
            <div className="game-score"> score:{elem.score}</div>{" "}
            <div className="game-moves"> moves:{elem.moves}</div>{" "}
          </div>
        ))}
      />
      <main className="main">
        <CardBoard
          cards={cards}
          flipped={flipped}
          handleClick={handleClick}
          disabled={disabled}
          guessed={guessed}
          level={level}
        
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

      <Overlay onClick={handleOverlayClick} />
    </div>
  );
}
