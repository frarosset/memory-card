import { PropTypes } from "prop-types";
import "../../styles/ScoreBoard.css";

function ScoreBoard({ score, bestScore, isNewBestScore }) {
  return (
    <div className={"scoreboard"}>
      <p className={"scoreboard-score-label"}>Score:</p>
      <p className={"scoreboard-score-value"}>{score}</p>
      {isNewBestScore && <p className={"scoreboard-bestscore-new"}>NEW!</p>}
      <p className={"scoreboard-bestscore-label"}>Best:</p>
      <p className={"scoreboard-bestscore-value"}>{bestScore}</p>
    </div>
  );
}

ScoreBoard.propTypes = {
  score: PropTypes.number,
  bestScore: PropTypes.number,
  isNewBestScore: PropTypes.bool,
};

export default ScoreBoard;
