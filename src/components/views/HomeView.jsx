import { PropTypes } from "prop-types";
import Title from "../Title.jsx";
import Instructions from "../Instructions.jsx";
import Attribution from "../Attribution.jsx";
import PlayGameCard from "../game/PlayGameCard.jsx";
import "../../styles/HomeView.css";
import "../../styles/CardsContainer.css";

function HomeView({ gameLevels, setPlayGameCallback }) {
  return (
    <div className={"view home-view"}>
      <header>
        <Title animate={true} />
        <Instructions />
      </header>
      <main>
        <div className="cards-container">
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
