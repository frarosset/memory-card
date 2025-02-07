import { useState, useRef } from "react";
import { PropTypes } from "prop-types";
import GameBoard from "../game/GameBoard.jsx";
import ScoreBoard from "../game/ScoreBoard.jsx";

function GameView({ bestScore, setBestScore }) {
  // Game score
  const [score, setScore] = useState(0);
  const isNewBestScore = useRef(false);

  // A function that increment the score state by delta and
  // at the same time checks whether the bestScore is improved
  const incrementScore = (delta = 1) => {
    setScore((s) => {
      const nextScore = s + delta;
      if (nextScore > bestScore) {
        isNewBestScore.current = true;
        setBestScore(nextScore);
      }
      return nextScore;
    });
  };

  return (
    <div className={"view game-view"}>
      <header>
        <ScoreBoard
          {...{ score, bestScore }}
          isNewBestScore={isNewBestScore.current}
        />
      </header>
      <main>
        <GameBoard incrementScore={incrementScore} />
      </main>
    </div>
  );
}

GameView.propTypes = {
  bestScore: PropTypes.number,
  setBestScore: PropTypes.func,
};

export default GameView;
