import "./ClearButtons.css";

export const Clear = ({ onClick }) => (
  <button onClick={onClick} className="clear" id="clear">
    AC
  </button>
);

export const BackSpace = ({ onClick }) => (
  <button onClick={onClick} className="backspace" id="backspace">
    <i className="fas fa-backspace"></i>
  </button>
);
