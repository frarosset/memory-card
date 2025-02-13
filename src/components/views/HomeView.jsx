import { PropTypes } from "prop-types";
import Title from "../Title.jsx";
import "../../styles/GameView.css";

function HomeView({ gameLevels }) {
  return (
    <div className={"view home-view"}>
      <header>
        <Title />
      </header>
      <main>
        {gameLevels.map((level) => (
          <button key={level.key}>{level.label}</button>
        ))}
      </main>
    </div>
  );
}

HomeView.propTypes = {
  gameLevels: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

export default HomeView;
