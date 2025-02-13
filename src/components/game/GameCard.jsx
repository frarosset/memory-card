import { PropTypes } from "prop-types";
import Card from "../Card.jsx";
import "../../styles/GameCard.css";

function GameCard({ src, alt, id, customClass }) {
  return (
    <Card
      customClass={`game-card ${customClass}`}
      customAttributes={{ "data-id": id }}
    >
      <img className="game-card-img" src={src} alt={alt} />
    </Card>
  );
}

GameCard.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  id: PropTypes.string,
  customClass: PropTypes.string,
};

export default GameCard;
