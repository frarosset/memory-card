import { useState, useEffect, useRef } from "react";
import fetchCardsData from "../helper/fetching/fetchCardsData.js";

const maxNumOfAttempts = 100;

function useDeck(requestedDeckSize) {
  // The deck is an array containing the info of the possible cards to use, and is a
  // state variable, so modifying it always triggers a re-render.
  // The deckSize input specify the desired size of the deck. On first mount, this is
  // used as initial size of the deck and deckSize cards info are fetched. A re-render
  // is triggered whenever deckSize increases, as there are new cards to fetch.
  //
  // Fetching is done through a useEffect hook which is evaluated whenever deck or
  // requestedDeckSize change.An internal ref cardsToFetch is defined and used within
  // such effect to keep track of the cards to fetch:
  //
  // - if cardsToFetch.current is 0, it means there are no ongoing fetch requests,
  //   so a new value for it is computed based on requestedDeckSize and deck.size.
  // - then, if cardsToFetch.current is non-zero, a fetch is initialized.
  //
  //   If this is successful, cardsToFetch.current is set to 0 and the deck is updated.
  //   Otherwise, cardsToFetch.current is not reset to 0. On successive re-renders, the
  //   failed request is re-attemped using the old cardsToFetch.current: if this is
  //   successful, the effect is run again to check whether more fetching are needed
  //   (this avoids increasing the number of fetch attampts at each fail / abort).
  //
  // To avoid race conditions in development (with StrictMode enabled) or when multiple
  // size update are issued quickly, an AbortController has been used.
  // see: https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect
  //
  // Note: The hook has been tested against some possible race conditions occurring in
  // development (with StrictMode enabled) or when multiple size updates are issued quickly,
  // also enabling low-end mobile device on DevTools, to simulate slow fetching.

  const [deck, setDeck] = useState(() => new Map());
  const cardsToFetch = useRef(requestedDeckSize); // this is not used during rendering

  useEffect(() => {
    // console.log("EffectInDeck", {
    //   requestedDeckSize: requestedDeckSize,
    //   currentDeckSize: deck.size,
    //   cardsToFetch: cardsToFetch.current,
    // });

    if (cardsToFetch.current == 0) {
      cardsToFetch.current = Math.max(requestedDeckSize - deck.size, 0);
    }

    if (cardsToFetch.current > 0) {
      const abortController = new AbortController();
      let numAttempts = 0;

      const fetchData = async () => {
        try {
          const copiedDeck = structuredClone(deck);

          while (cardsToFetch.current > 0 && numAttempts < maxNumOfAttempts) {
            const newCards = await fetchCardsData(
              cardsToFetch.current,
              abortController.signal,
            );

            newCards.forEach((card) => {
              if (!copiedDeck.has(card.id)) {
                copiedDeck.set(card.id, card);
                cardsToFetch.current--;
              }
            });

            // const ids = newCards.map((c) => c.id);
            // console.log(
            //   ids.length,
            //   new Set(ids).size,
            //   copiedDeck.size,
            //   cardsToFetch.current,
            //   numAttempts,
            // );
            // console.log(ids.sort());

            numAttempts++;
          }

          setDeck(copiedDeck);
        } catch {
          //console.log(e.message);
        }
      };

      fetchData();

      return () => {
        abortController.abort();
      };
    }
  }, [requestedDeckSize, deck]);

  return deck;
}

export default useDeck;
