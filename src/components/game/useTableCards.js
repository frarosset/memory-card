import { useState } from "react";

function useTableCards(
  tableSize,
  selectedCardsFractInTable,
  deck,
  isSelectedCard,
  numOfSelectedCards
) {
  // selectedCardsFractInTable: fraction of selected cards present in the table.
  //    The floor of such number is taken.
  //    If the number of already selected cards is smaller than this number,
  //    all the selected cards are used.

  function getTableCards() {
    // No table if there aren't enough cards
    if (tableSize > deck.size || tableSize === 0) {
      return [];
    }

    // Pick tableSize unique random cards from the deck, of which
    // - numOfSelectedCardsInTable selected cards
    // - numOfUnselectedCardsInTable unselected cards

    let numOfSelectedCardsInTable = Math.min(
      Math.max(
        Math.floor(tableSize * selectedCardsFractInTable),
        1 /* get the fraction, but use at least one selected card */
      ),
      numOfSelectedCards /* clip to the number of selected cards */,
      tableSize - 1 /* leave at least one not selected item */
    );

    let numOfUnselectedCardsInTable = tableSize - numOfSelectedCardsInTable;

    // Debug message
    console.log(
      `D: ${deck.size} [ ${numOfSelectedCards} | ${
        deck.size - numOfSelectedCards
      } ] --- T: ${tableSize} [ ${numOfSelectedCardsInTable} | ${numOfUnselectedCardsInTable} ] --- ${(
        numOfSelectedCardsInTable / numOfSelectedCards
      ).toFixed(2)} | ${(
        numOfUnselectedCardsInTable /
        (deck.size - numOfSelectedCards)
      ).toFixed(2)} --- ${(numOfSelectedCardsInTable / tableSize).toFixed(
        2
      )} / ${selectedCardsFractInTable.toFixed(2)}`
    );

    // Choose such cards
    const allIds = [...deck.keys()];
    const table = [];

    while (numOfSelectedCardsInTable > 0 || numOfUnselectedCardsInTable > 0) {
      // get a random card
      const randomIdx = randomInteger(0, allIds.length - 1);
      const randomCardId = allIds[randomIdx];
      const isRandomCardSelected = isSelectedCard(randomCardId);

      if (numOfSelectedCardsInTable > 0 && isRandomCardSelected) {
        // the card is selected and to be included in the table
        table.push(randomCardId);
        numOfSelectedCardsInTable--;
        allIds.splice(randomIdx, 1);
      } else if (numOfUnselectedCardsInTable > 0 && !isRandomCardSelected) {
        // the card is unselected and to be included in the table
        table.push(randomCardId);
        numOfUnselectedCardsInTable--;
        allIds.splice(randomIdx, 1);
      }
    }

    // shuffle the cards: depending on the number of the selected cards in the deck,
    // the above procedure might not give shuffled results
    shuffle(table);

    return table;
  }

  const [tableCards, setTableCards] = useState([]);

  function refreshTableCards() {
    setTableCards(getTableCards());
  }

  return [tableCards, refreshTableCards];
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Shuffle array in place
// from: https://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

export default useTableCards;
