import { PropTypes } from "prop-types";
import Title from "../Title.jsx";
import Instructions from "../Instructions.jsx";
import Attribution from "../Attribution.jsx";
import PlayGameCard from "../game/PlayGameCard.jsx";
import useCardsPerRowAndCol from "../../customHooks/useCardsPerRowAndCol.js";
import "../../styles/HomeView.css";
import "../../styles/CardsContainer.css";

function HomeView({ gameLevels, setPlayGameCallback }) {
  const cardsContainerRef = useCardsPerRowAndCol(
    gameLevels.length,
    "--home-level-cards-per-row",
    "--home-level-cards-per-col"
  );

  return (
    <div className={"view home-view"}>
      <header>
        <Title animate={true} />
        <Instructions />
      </header>
      <main>
        <div className="cards-container" ref={cardsContainerRef}>
          {gameLevels.map((level) => (
            <PlayGameCard
              key={level.key}
              level={level.label}
              bestScore={level.bestScore}
              playGameCallback={setPlayGameCallback(level.key)}
            />
          ))}
        </div>
      </main>
      <footer className="attribution-footer">
        <Attribution />
      </footer>
    </div>
  );
}

HomeView.propTypes = {
  gameLevels: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ),
  setPlayGameCallback: PropTypes.func,
};

export default HomeView;
