import "./Displays.css";

export const Display = ({ input }) => <div id="display">{input}</div>;

export const InputDisplay = ({ input, onChange, onsubmit }) => (
  <form id="inputForm" onSubmit={onsubmit}>
    <input
      placeholder="type or paste..."
      onChange={onChange}
      type="text"
      id="inputDisplay"
      value={input}
      autoComplete="off"
    ></input>
  </form>
);

