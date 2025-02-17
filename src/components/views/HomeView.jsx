import { PropTypes } from "prop-types";
import Title from "../Title.jsx";
import Instructions from "../Instructions.jsx";
import Attribution from "../Attribution.jsx";
import "../../styles/GameView.css";

function HomeView({ gameLevels, setPlayGameCallback }) {
  return (
    <div className={"view home-view"}>
      <header>
        <Title animate={true} />
        <Instructions />
      </header>
      <main>
        {gameLevels.map((level) => (
          <button key={level.key} onClick={setPlayGameCallback(level.key)}>
            {level.label}
          </button>
        ))}
      </main>
      <footer className="attribution-footer">
        <Attribution />
      </footer>
    </div>
  );
}

HomeView.propTypes = {
  gameLevels: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  setPlayGameCallback: PropTypes.func,
};

export default HomeView;
