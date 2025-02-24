import { useRef, useEffect } from "react";

function useCardsPerRowAndCol(
  numOfCards,
  cardsPerRowCssVar,
  cardsPerColCssVar
) {
  const ref = useRef(null);

  useEffect(() => {
    const getCardsPerRowCallback = () => {
      getCardsPerRow(
        ref.current,
        numOfCards,
        cardsPerRowCssVar,
        cardsPerColCssVar
      );
    };

    getCardsPerRow(
      ref.current,
      numOfCards,
      cardsPerRowCssVar,
      cardsPerColCssVar
    );
    window.addEventListener("resize", getCardsPerRowCallback);

    return () => {
      window.removeEventListener("resize", getCardsPerRowCallback);
    };
  }, [ref, numOfCards, cardsPerRowCssVar, cardsPerColCssVar]);

  return ref;
}

function getCardsPerRow(
  element,
  numOfCards,
  cardsPerRowCssVar,
  cardsPerColCssVar
) {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  let maxSize = 0;
  let maxCardsPerRow;
  let maxCardsPerCol;

  // try every possible number of columns in which the cards are distributed as a grid
  // first, estimate the corresponding number of rows of such grid
  // then, estimate the cards size so that they fit the container
  // look for the number of rows/cols so that the card size is the largest
  for (let cols = 1; cols <= numOfCards; cols++) {
    const rows = Math.ceil(numOfCards / cols);

    const size = Math.min(width / cols, height / rows);

    if (size > maxSize) {
      maxSize = size;
      maxCardsPerRow = cols;
      maxCardsPerCol = rows;
    }
  }

  // set the final cards grid size as css variables
  element.style.setProperty(cardsPerRowCssVar, maxCardsPerRow);
  element.style.setProperty(cardsPerColCssVar, maxCardsPerCol);
}

export default useCardsPerRowAndCol;
