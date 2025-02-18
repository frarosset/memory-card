import { PropTypes } from "prop-types";
import Title from "../Title.jsx";
import GameOverCard from "../game/GameOverCard.jsx";
import Attribution from "../Attribution.jsx";
import "../../styles/GameOverView.css";
import "../../styles/CardsContainer.css";

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
        <div className="cards-container">
          <GameOverCard
            {...{
              score,
              isNewBestScore,
              playGameCallback,
              setHomeViewCallback,
            }}
          />
        </div>
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
