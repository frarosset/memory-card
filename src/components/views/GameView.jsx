import { useState } from "react";
import { PropTypes } from "prop-types";
import GameBoard from "../game/GameBoard.jsx";

function GameView({ bestScore, setBestScore }) {
  // Game score
  const [score, setScore] = useState(0);

  // A function that increment the score state by delta and
  // at the same time checks whether the bestScore is improved
  const incrementScore = (delta = 1) => {
    setScore((s) => {
      const nextScore = s + delta;
      if (nextScore > bestScore) {
        setBestScore(nextScore);
      }
      return nextScore;
    });
  };

  console.log(score, bestScore);

  return (
    <main className={"game-view"}>
      <GameBoard incrementScore={incrementScore} />
    </main>
  );
}

GameView.propTypes = {
  bestScore: PropTypes.number,
  setBestScore: PropTypes.func,
};

export default GameView;
