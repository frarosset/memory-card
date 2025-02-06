import { useState } from "react";
import Card from "./Card.jsx";
import useDeck from "./useDeck.js";
import "../../styles/GameBoard.css";

function GameBoard() {
  // The imposed size of the deck, which contains the possible cards to use.
  // It is not necessarily equal to the actual size of the deck defined next,
  // because such deck is filled asyncronously to deckSize by useDeck() custom hook.
  const [deckSize, setDeckSize] = useState(4);

  // The deck is handled internally by the useDeck custom hook.
  // The returned deck should not be modified.
  // Passing a larger deckSize updates the deck with new cards: a render is always
  // triggered when the operation is completed
  const deck = useDeck(deckSize);

  // Temporary click callback to test the deck handling of useDeck
  const clickCallback = () => {
    setDeckSize((x) => x + 1);
  };

  // Currently, just to test, just render the full deck
  const tableCards = deck;

  return (
    <div className="gameboard" onClick={clickCallback}>
      {tableCards.map((card) => (
        <Card key={card.id} src={card.url} />
      ))}
    </div>
  );
}

export default GameBoard;
