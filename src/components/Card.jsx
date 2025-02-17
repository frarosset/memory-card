import { PropTypes } from "prop-types";
import "../styles/Card.css";

function Card({ children, customClass, customAttributes, onClickCallback }) {
  return (
    <div
      className={`card ${customClass}`}
      onPointerEnter={onPointerEnterCallback}
      {...customAttributes}
      onClick={onClickCallback}
    >
      <div className="card-rear card-face"></div>
      <div className="card-front card-face">{children}</div>
      <div className="card-glow"></div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node), // array of elements
    PropTypes.element, // a single element
  ]).isRequired,
  customClass: PropTypes.string,
  customAttributes: PropTypes.objectOf(PropTypes.string),
  onClickCallback: PropTypes.func,
};

export default Card;

// The pointer enter callback is used to handle the hovering over
// the Card component. The code is based on:
// https://codepen.io/markmiro/pen/wbqMPa

function onPointerEnterCallback(e) {
  const card = e.currentTarget;

  const rotateToPointer = (e) => {
    const bounds = card.getBoundingClientRect();
    const pointerX = e.clientX;
    const pointerY = e.clientY;
    const leftX = pointerX - bounds.x;
    const topY = pointerY - bounds.y;
    const centerX = leftX - bounds.width / 2;
    const centerY = topY - bounds.height / 2;

    const distance = Math.sqrt(centerX ** 2 + centerY ** 2);

    // Set some css variables which are used to define the style of the Card components
    card.style.setProperty("--card-hover-scale", "1.1");
    card.style.setProperty("--card-hover-shadow-size", "20px");
    card.style.setProperty("--card-hover-rotate3d-x", `${centerY / 100}`);
    card.style.setProperty("--card-hover-rotate3d-y", `${-centerX / 100}`);
    card.style.setProperty(
      "--card-hover-rotate3d-deg",
      `${Math.log(distance) * 2}deg`
    );
    card.style.setProperty("--card-hover-glow-x", `${leftX}px`);
    card.style.setProperty("--card-hover-glow-y", `${topY}px`);
    card.style.setProperty("--card-hover-glow-color", "#ffffff55");
    card.style.setProperty(
      "--card-hover-perspective-x",
      `${(leftX / bounds.width) * 100}%`
    );
    card.style.setProperty(
      "--card-hover-perspective-y",
      `${(topY / bounds.height) * 100}%`
    );
  };

  // pointerLeaveCallback
  const onPointerLeaveCallback = (e) => {
    const card = e.currentTarget;
    card.removeEventListener("pointermove", rotateToPointer);
    card.removeEventListener("pointerleave", onPointerLeaveCallback);

    card.style.setProperty("--card-hover-scale", "");
    card.style.setProperty("--card-hover-shadow-size", "");
    card.style.setProperty("--card-hover-rotate3d-x", "");
    card.style.setProperty("--card-hover-rotate3d-y", "");
    card.style.setProperty("--card-hover-rotate3d-deg", "");
    card.style.setProperty("--card-hover-glow-x", "");
    card.style.setProperty("--card-hover-glow-y", "");
    card.style.setProperty("--card-hover-glow-color", "");
    card.style.setProperty("--card-hover-perspective-x", "");
    card.style.setProperty("--card-hover-perspective-y", "");
  };

  card.addEventListener("pointermove", rotateToPointer);
  card.addEventListener("pointerleave", onPointerLeaveCallback);
}
