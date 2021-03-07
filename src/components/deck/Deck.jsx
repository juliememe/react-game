import { CARDDECK } from "../card-list/CardList";

function shuffle(array) {
  const newArray = array.slice(0);
  for (let i = 0; i < array.length - 1; i++) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let temp = newArray[i];
    newArray[i] = newArray[randomIndex];
    newArray[randomIndex] = temp;
  }
  return newArray;
}

export default function initializeDeck() {
  let id = 0;

  const card = CARDDECK.reduce((acc, type) => {
    acc.push({
      id: id++,
      type,
    });
    acc.push({
      id: id++,
      type,
    });
    return acc;
  }, []);

  return shuffle(card);

  // console.log(CARDDECK)
}
