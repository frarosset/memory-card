import { PropTypes } from "prop-types";
import "../styles/Title.css";

const appTitle = "Meowmory";

function Title({ onClickCallback }) {
  return (
    <div className="title" onClick={onClickCallback}>
      <h1 aria-label={appTitle}>
        {appTitle.split("").map((letter, idx) => (
          <span key={idx} aria-hidden={true} className={"title-letter"}>
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
}

Title.propTypes = {
  onClickCallback: PropTypes.func,
};

export default Title;
