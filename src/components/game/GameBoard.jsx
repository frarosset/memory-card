import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import GameCard from "./GameCard.jsx";
import useDeck from "./useDeck.js";
import useSelectedCards from "./useSelectedCards.js";
import useTableCards from "./useTableCards.js";
import "../../styles/GameBoard.css";

const delayFetchingToReadyInMs = 1000;

function GameBoard({
  incrementScore,
  initialDeckSize = 6,
  incrementDeckSize = 1,
  tableSize = 3,
  selectedCardsFractInTable = 0.5,
  gameOverCallback = () => alert("Game over!"),
}) {
  // The imposed size of the deck, which contains the possible cards to use.
  // It is not necessarily equal to the actual size of the deck defined next,
  // because such deck is filled asyncronously to deckSize by useDeck() custom hook.
  const [deckSize, setDeckSize] = useState(initialDeckSize);

  // The deck is handled internally by the useDeck custom hook.
  // The returned deck should not be modified.
  // Passing a larger deckSize updates the deck with new cards: a render is always
  // triggered when the operation is completed
  const deck = useDeck(deckSize);

  // The selected cards are handled internally by the useDeck custom hook.
  // Two functions are exposed, both of which require the card id:
  // one can be used to check whether a card has already been selected, and
  // the other to acknowledge that the associated card has been selected.
  const { isSelectedCard, setSelectedCard, numOfSelectedCards } =
    useSelectedCards();

  // The gameState state keeps track on the phase of the game.
  // Eg, the cards click callbacks are disabled when cards are being fetched. [todo]
  // The applied style might also depend on this. [todo]
  // States: "fetching-init" > "ready" > "fetching" > "ready" >...
  const [gameState, setGameState] = useState("fetching-init");

  // Get the cards shown in the table (this is handled internally by useTableCards)
  const [tableCards, refreshTableCards] = useTableCards(
    tableSize,
    selectedCardsFractInTable,
    deck,
    isSelectedCard,
    numOfSelectedCards
  );

  useEffect(() => {
    const isInit = gameState === "fetching-init";
    const isFetching = isInit || gameState === "fetching";

    if (isFetching && deckSize === deck.size) {
      setTimeout(
        () => {
          setGameState(isInit ? "ready-init" : "ready");
          refreshTableCards();
        },
        isInit ? 0 : delayFetchingToReadyInMs
      );
    }
  }, [deck, deckSize, gameState, refreshTableCards]);

  // Temporary click callback to test the deck handling of useDeck
  // Event delegation is used: when a click is captured, we have to check
  // whether there is a card in the clicked point.
  const clickCallback = (e) => {
    const card = e.target.closest(".game-card");
    if (card == null) return;

    const cardId = card.getAttribute("data-id");
    if (!cardId) return;

    if (isSelectedCard(cardId)) {
      // code for clicking on a selected card
      gameOverCallback();
      return;
    }

    // code for clicking on an unselected card (todo)
    incrementScore(1);
    setGameState("fetching");
    setSelectedCard(cardId);

    setDeckSize((x) => x + incrementDeckSize);
  };

  return (
    <div
      className={`gameboard ${gameState}`}
      onClick={gameState !== "fetching" ? clickCallback : undefined}
    >
      {tableCards.map((cardId, idx) => {
        const card = deck.get(cardId);
        return (
          <GameCard
            key={idx}
            src={card.url}
            id={card.id}
            customClass={isSelectedCard(card.id) ? "selected" : ""}
          />
        );
      })}
    </div>
  );
}

GameBoard.propTypes = {
  incrementScore: PropTypes.func,
  gameOverCallback: PropTypes.func,
  initialDeckSize: PropTypes.number,
  incrementDeckSize: PropTypes.number,
  tableSize: PropTypes.number,
  selectedCardsFractInTable: PropTypes.number,
};

export default GameBoard;
