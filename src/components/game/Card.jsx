import { PropTypes } from "prop-types";
import "../../styles/Card.css";

function Card({ src, alt }) {
  return <img className={`card`} src={src} alt={alt} />;
}

Card.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Card;
