import { useState } from "react";

function useSelectedCards() {
  const [selectedCards, setSelectedCards] = useState(new Set([]));

  function isSelectedCard(id) {
    return selectedCards.has(id);
  }

  function setSelectedCard(id) {
    setSelectedCards(new Set([...selectedCards, id]));
  }

  const numOfSelectedCards = selectedCards.size;

  return { isSelectedCard, setSelectedCard, numOfSelectedCards };
}

export default useSelectedCards;
