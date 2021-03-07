import "./Digits.css";

export const Digits = ({ onClick }) => {
  const nums = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const elems = [];

  for (let i = 0; i < nums.length; i++) {
    elems.push(
      <button key={nums[i]} onClick={onClick} className="digit" id={nums[i]}>
        {i}
      </button>
    );
  }
  return <div id="digitsContainer">{elems} </div>;
};
