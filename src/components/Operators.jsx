import "./Operators.css";

export const Add = ({ onClick }) => (
  <button className="operator" id="add" onClick={onClick}>
    <i className="fas fa-plus"></i>+
  </button>
);
export const Subtract = ({ onClick }) => (
  <button className="operator" id="subtract" onClick={onClick}>
    <i className="fas fa-minus"></i>-
  </button>
);
export const Multiply = ({ onClick }) => (
  <button className="operator" id="multiply" onClick={onClick}>
    <i className="fas fa-times"></i>*
  </button>
);
export const Divide = ({ onClick }) => (
  <button className="operator" id="divide" onClick={onClick}>
    <i className="fas fa-divide"></i>/
  </button>
);
export const Equals = ({ onClick }) => (
  <button onClick={onClick} className="equals" id="equals">
    =
  </button>
);
