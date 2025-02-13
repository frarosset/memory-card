import { PropTypes } from "prop-types";
import "../styles/Title.css";

function Title({ onClickCallback }) {
  return (
    <div className="title" onClick={onClickCallback}>
      <h1>Meowmory</h1>
    </div>
  );
}

Title.propTypes = {
  onClickCallback: PropTypes.func,
};

export default Title;
