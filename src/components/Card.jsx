import { PropTypes } from "prop-types";
import "../styles/Card.css";

function Card({ children, customClass }) {
  return (
    <div className={`card ${customClass}`}>
      <div className="card-rear card-face"></div>
      <div className="card-front card-face">{children}</div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node), // array of elements
    PropTypes.element, // a single element
  ]).isRequired,
  customClass: PropTypes.string,
};

export default Card;
