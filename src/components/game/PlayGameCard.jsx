import { PropTypes } from "prop-types";
import Card from "../Card.jsx";
import "../../styles/GameCard.css";

function PlayGameCard({ level, bestScore, playGameCallback }) {
  return (
    <Card customClass={`play-game-card`} onClickCallback={playGameCallback}>
      <h2 className="play-game-level">{level}</h2>
      <p className="play-game-best-score">{`Best: ${bestScore}`}</p>
    </Card>
  );
}

PlayGameCard.propTypes = {
  level: PropTypes.string,
  bestScore: PropTypes.number,
  playGameCallback: PropTypes.func,
};

export default PlayGameCard;
