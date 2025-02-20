import { useState, useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import GameCard from "./GameCard.jsx";
import useDeck from "../../customHooks/useDeck.js";
import useSelectedCards from "../../customHooks/useSelectedCards.js";
import useTableCards from "../../customHooks/useTableCards.js";
import useCardsPerRowAndCol from "../../customHooks/useCardsPerRowAndCol.js";
import "../../styles/GameBoard.css";
import "../../styles/CardsContainer.css";

const delayFetchingToReadyInMs = 1000;

function GameBoard({
  incrementScore,
  initialDeckSize = 6,
  incrementDeckSize = 1,
  initialTableSize = 3,
  incrementTableSize = 1,
  initialSelectedCardsFractInTable = 0.3,
  limitSelectedCardsFractInTable = initialSelectedCardsFractInTable,
  aSelectedCardsFractInTable = 1,
  gameOverCallback = () => alert("Game over!"),
}) {
  // Validate increment inputs. When incrementing the deck size,
  // consider also the increment on the table, to avoid being out
  // of unselected cards to be used in there.
  const actualIncrementDeckSize = useRef(
    Math.max(incrementDeckSize, 1) + Math.max(incrementTableSize, 0)
  );
  const actualIncrementTableSize = useRef(Math.max(incrementTableSize, 0));

  // The imposed size of the deck, which contains the possible cards to use.
  // It is not necessarily equal to the actual size of the deck defined next,
  // because such deck is filled asyncronously to deckSize by useDeck() custom hook.
  // Take into account the TableSize, if this is larger than the desired deckSize
  const [deckSize, setDeckSize] = useState(
    Math.max(initialDeckSize, initialTableSize)
  );

  // The imposed size of the deck, which contains the possible cards to use.
  // It is not necessarily equal to the actual size of the deck defined next,
  // because such deck is filled asyncronously to deckSize by useDeck() custom hook.
  const [tableSize, setTableSize] = useState(initialTableSize);

  // selectedCardsFractInTable (denoted y(k) below) roughly represent the desired
  // fraction of selected cards shown on the table, provided that there are enough of
  // them (if this is not the case, all the selected cards are shown).
  //
  // See ./useTableCards.js for more details.
  //
  // It starts from initialSelectedCardsFractInTable and increase over time converging
  // to limitSelectedCardsFractInTable with a speed depending on
  // aSelectedCardsFractInTable, evolving according to:
  //   y(k) = y0 + (b - y0) * (1 - a^k),
  // where:
  //   y(0) = y0
  //   y(k) -> b for k -> +inf
  //   a: aSelectedCardsFractInTable, 0<a<=1
  //   b: limitSelectedCardsFractInTable
  //  y0: initialSelectedCardsFractInTable
  // that is:
  //   a^k = 1 - (y(k) - y0) / (b - y0)
  // y(k+1) = y0 + (b - y0) * (1 - a^(k+1))
  //        = y0 + (b - y0) * (1 - a*a^k)
  //        = y0 + (b - y0) * (1 - a*(1 - (y(k) - y0) / (b - y0)))
  //        = b - ab + a * y(k)
  //        = (1-a)*b + a * y(k)
  //        = scfK + scfA * y(k)
  //
  // Constraints:
  //   0 <= initialSelectedCardsFractInTable <= limitSelectedCardsFractInTable <= 1
  //   0 < aSelectedCardsFractInTable < 1
  //
  // If you want to keep the value constant, just use
  // limitSelectedCardsFractInTable = initialSelectedCardsFractInTable
  // and aSelectedCardsFractInTable = 1, which are the default values for such props,
  // ie, just provide initialSelectedCardsFractInTable as prop.

  const scfA = useRef(clipFraction(aSelectedCardsFractInTable));
  const scfY0 = useRef(clipFraction(initialSelectedCardsFractInTable));
  const scfLimit = useRef(
    Math.max(clipFraction(limitSelectedCardsFractInTable), scfY0.current)
  );
  const scfK = useRef((1 - scfA.current) * scfLimit.current);

  const [selectedCardsFractInTable, setSelectedCardsFractInTable] = useState(
    scfY0.current
  );

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
      if (isInit) {
        setGameState("ready-init");
        refreshTableCards();
      } else {
        // When not in the initialization phase, after the fetching is done,
        // you might want to update the table size and the selected card fraction
        // in the table. Use a temporary game state, which triggers a re-render.
        // On the next game render, the table cards are refreshed
        setTimeout(() => {
          setGameState("update-table-settings");
          setTableSize((x) => x + actualIncrementTableSize.current);
          setSelectedCardsFractInTable((x) => scfK.current + scfA.current * x);
        }, delayFetchingToReadyInMs);
      }
    } else if (gameState === "update-table-settings") {
      refreshTableCards();
      setGameState("ready");
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
    setSelectedCard(cardId);
    setGameState("fetching");
    setDeckSize((x) => x + actualIncrementDeckSize.current);
  };

  const cardsContainerRef = useCardsPerRowAndCol(
    tableSize,
    "--gameboard-cards-per-row",
    "--gameboard-cards-per-col"
  );

  return (
    <div
      className={`gameboard ${gameState} cards-container`}
      ref={cardsContainerRef}
      onClick={gameState !== "fetching" ? clickCallback : undefined}
    >
      {gameState === "fetching-init" ? (
        <img className={"fetching-init-img"} src={"/loading.gif"} />
      ) : (
        tableCards.map((cardId, idx) => {
          const card = deck.get(cardId);
          return (
            <GameCard
              key={idx}
              src={card.url}
              id={card.id}
              customClass={isSelectedCard(card.id) ? "selected" : ""}
            />
          );
        })
      )}
    </div>
  );
}

function clipFraction(n) {
  return Math.min(Math.max(0, n), 1);
}

GameBoard.propTypes = {
  incrementScore: PropTypes.func,
  gameOverCallback: PropTypes.func,
  initialDeckSize: PropTypes.number,
  incrementDeckSize: PropTypes.number,
  initialTableSize: PropTypes.number,
  incrementTableSize: PropTypes.number,
  selectedCardsFractInTable: PropTypes.number,
  initialSelectedCardsFractInTable: PropTypes.number,
  limitSelectedCardsFractInTable: PropTypes.number,
  aSelectedCardsFractInTable: PropTypes.number,
};

export default GameBoard;
