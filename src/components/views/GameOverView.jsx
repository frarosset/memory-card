import { PropTypes } from "prop-types";
import Title from "../Title.jsx";
import Card from "../Card.jsx";
import Attribution from "../Attribution.jsx";
import "../../styles/GameOver.css";

function GameOverView({
  score,
  isNewBestScore,
  playGameCallback,
  setHomeViewCallback,
}) {
  return (
    <div className={"view game-over-view"}>
      <header>
        <Title onClickCallback={setHomeViewCallback} />
      </header>
      <main>
        <Card customClass={`game-over-card`}>
          <h2 className="game-over-msg">GAME OVER</h2>
          <div className="game-over-score">
            <p className="game-over-score-msg">{`You scored ${score}`}</p>
            {isNewBestScore && (
              <p className="game-over-new-best-score-msg">NEW BEST SCORE!</p>
            )}
          </div>
          <div className="game-over-btns">
            <button className="game-over-btn" onClick={playGameCallback}>
              RETRY
            </button>
            <button className="game-over-btn" onClick={setHomeViewCallback}>
              HOME
            </button>
          </div>
        </Card>
      </main>
      <footer className="attribution-footer">
        <Attribution />
      </footer>
    </div>
  );
}

GameOverView.propTypes = {
  score: PropTypes.number,
  isNewBestScore: PropTypes.bool,
  playGameCallback: PropTypes.func,
  setHomeViewCallback: PropTypes.func,
};

export default GameOverView;
