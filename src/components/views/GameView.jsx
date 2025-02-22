import { useState } from "react";
import { PropTypes } from "prop-types";
import GameBoard from "../game/GameBoard.jsx";
import ScoreBoard from "../game/ScoreBoard.jsx";
import Title from "../Title.jsx";
import Attribution from "../Attribution.jsx";
import "../../styles/GameView.css";

function GameView({
  bestScore,
  setBestScore,
  setGameOverViewCallback,
  gameSettings,
  setHomeViewCallback,
}) {
  // Game score
  const [score, setScore] = useState(0);
  const [isNewBestScore, setIsNewBestScore] = useState(false);

  const gameOverCallback = () =>
    setGameOverViewCallback(score, isNewBestScore, gameSettings.level);

  // A function that increment the score state by delta and
  // at the same time checks whether the bestScore is improved
  const incrementScore = (delta = 1) => {
    setScore((s) => {
      const nextScore = s + delta;
      if (nextScore > bestScore) {
        setIsNewBestScore(true);
        setBestScore(nextScore);
      }
      return nextScore;
    });
  };

  return (
    <div className={"view game-view"}>
      <header>
        <Title onClickCallback={setHomeViewCallback} />
        <ScoreBoard {...{ score, bestScore, isNewBestScore }} />
      </header>
      <main>
        <GameBoard
          incrementScore={incrementScore}
          gameOverCallback={gameOverCallback}
          {...{ ...gameSettings }}
        />
      </main>
      <footer className="attribution-footer">
        <Attribution />
      </footer>
    </div>
  );
}

GameView.propTypes = {
  bestScore: PropTypes.number,
  setBestScore: PropTypes.func,
  setGameOverViewCallback: PropTypes.func,
  gameSettings: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  setHomeViewCallback: PropTypes.func,
};

export default GameView;
