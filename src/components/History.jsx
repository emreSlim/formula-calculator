import "./History.css";

export const History = ({ onClick }) => {
  return (
    <div id="historyContainer">
      <ul id="history"></ul>
      <button className="clear-history" onClick={onClick}>
        Clear History
      </button>
    </div>
  );
};

export const HistoryButton = ({ onClick }) => (
  <button onClick={onClick} className="show-history" id="showHistory">
    <i className="fas fa-history"></i>
  </button>
);