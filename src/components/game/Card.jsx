import { PropTypes } from "prop-types";
import "../../styles/Card.css";

function Card({ src, alt, id, customClass }) {
  return (
    <img className={`card ${customClass}`} src={src} alt={alt} data-id={id} />
  );
}

Card.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  id: PropTypes.string,
  customClass: PropTypes.string,
};

export default Card;
