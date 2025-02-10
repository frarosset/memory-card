import { PropTypes } from "prop-types";
import Title from "../Title.jsx";
import "../../styles/GameOver.css";

function GameOverView({ score, isNewBestScore, backBtnCallback }) {
  return (
    <div className={"view game-over-view"}>
      <header>
        <Title />
      </header>
      <main>
        <div className="game-over-msg-div card">
          <h2 className="game-over-msg">Game over</h2>
          <p className="game-over-score-msg">{`You scored ${score}`}</p>
          {isNewBestScore && (
            <p className="game-over-new-best-score-msg">NEW BEST SCORE!</p>
          )}
          <button className="game-over-back-btn" onClick={backBtnCallback}>
            BACK
          </button>
        </div>
      </main>
    </div>
  );
}

GameOverView.propTypes = {
  score: PropTypes.number,
  isNewBestScore: PropTypes.bool,
  backBtnCallback: PropTypes.func,
};

export default GameOverView;
