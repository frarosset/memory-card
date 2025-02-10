import { PropTypes } from "prop-types";

function GameOverView({ score, isNewBestScore }) {
  return (
    <div className={"view game-over-view"}>
      <main>
        <div className="game-over-msg-div">
          <h2 className="game-over-msg">Game over</h2>
          <p className="game-over-score-msg">{`You scored ${score}`}</p>
          {isNewBestScore && (
            <p className="game-over-new-best-score-msg">NEW BEST SCORE!</p>
          )}
        </div>
      </main>
    </div>
  );
}

GameOverView.propTypes = {
  score: PropTypes.number,
  isNewBestScore: PropTypes.bool,
};

export default GameOverView;
