import { PropTypes } from "prop-types";
import Title from "../Title.jsx";
import GameOverCard from "../game/GameOverCard.jsx";
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
        <GameOverCard
          {...{ score, isNewBestScore, playGameCallback, setHomeViewCallback }}
        />
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
