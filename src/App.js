/* eslint-disable no-undef */
import "./App.css";
import React from "react";
import { Digits } from "./components/Digits";
import { History, HistoryButton } from "./components/History";
import { Display, InputDisplay } from "./components/Displays";
import { Decimal } from "./components/Decimal";
import { Clear, BackSpace } from "./components/ClearButtons";
import {
  Add,
  Subtract,
  Divide,
  Multiply,
  Equals,
} from "./components/Operators";
import calculate from "./functions/calculate";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "0",
      output: "",
      currentInput: "",
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    $(document).on("keydown", this.handleClick);
    $("#inputDisplay").on("focus", this.handleFocus);
    $("#inputDisplay").on("blur", this.handleBlur);
    $("#inputForm").on("submit", this.submitHandler);
    $("i").on("click", this.transferEventToParent);
  }
  componentWillUnmount() {
    $(document).off("keydown", this.handleClick);
    $("#inputDisplay").off("focus", this.handleFocus);
    $("#inputDisplay").off("blur", this.handleBlur);
    $("#inputForm").off("submit", this.submitHandler);
    $("i").off("click", this.transferEventToParent);
  }

  componentDidUpdate() {
    if (this.state.input.length < 12) {
      $("#display").css({ "font-size": "60px" });
    } else if (this.state.input.length < 32) {
      $("#display").css({ "font-size": "50px" });
    } else {
      $("#display").css({ "font-size": "40px" });
    }
  }

  handleClick(e) {
    let key = e.keyCode;
    if (key > 95 && key < 106) {
      key -= 48;
    }

    let cls = e.target.className;
    let input = this.state.input;
    let currInp = this.state.currentInput;
    let targetValue = e.target.innerText;

    if (cls === "digit" || (key > 47 && key < 58)) {
      this.digitsButtonOrKeyPressResponse(e, key, input, currInp, targetValue);
    } else if (cls === "clear" || key === 46) {
      this.setState({ input: "0", currentInput: "" });
    } else if (cls === "decimal" || key === 110 || key === 190) {
      this.decimalButtonOrKeyPressResponse(e, input, currInp);
    } else if (cls === "operator" || /111|106|109|107/.test(key)) {
      this.operatorButtonOrKeyPressResponse(e, key, input, targetValue);
    } else if (cls === "equals" || key === 13) {
      this.submitHandler(e);
    } else if (cls === "backspace" || key === 8) {
      this.setState({
        input: input.length > 1 ? input.slice(0, -1) : "0",
        currentInput: currInp.slice(0, -1),
      });
    } else if (cls === "clear-history") {
      $("#history").fadeOut(200, function () {
        $(this).empty().show();
      });
    } else if (cls === "show-history" || key === 83) {
      $("#historyContainer").slideToggle(300);
    }
  }

  handleChange(e) {
    this.inputBoxInputResponse(e);
  }

  handleFocus(e) {
    $(document).off("keydown", this.handleClick);
  }

  handleBlur() {
    $(document).on("keydown", this.handleClick);
  }

  handleError() {
    $("#root").effect("shake", { times: 2, distance: 3 }, 150);
    $("#display,#inputDisplay").css({ color: "rgb(254,120,86)" });
    setTimeout(() => $("#display,#inputDisplay").css({ color: "" }), 150);
  }

  inputBoxInputResponse(e) {
    let val = e.target.value;
    val = val.replace(/[×]/g, "*");
    val = val.replace(/÷/g, "/");
    if (/[^0-9+\-*/\s.e]/.test(val)) {
      this.handleError();
    }
    val = val.replace(/[^0-9+\-*/\s.e]/g, "");

    if (
      val &&
      !/^[+*/]|(?<=\D)e|(?<=e)e|e(?=[\d/*])|^e|e[+-](?=\D)|\d+e[+-]\d+(?=e)|\/(?=[*/+])|\*(?=[*/+])|\+(?=[*/+])|-(?=\D)|\.(?=[./*\-+])/.test(
        val
      )
    ) {
      this.setState({ input: val, currentInput: val });
    } else if (!val) {
      this.setState({ input: "0", currentInput: "" });
    } else {
      this.handleError();
    }
  }

  decimalButtonOrKeyPressResponse(e, input, currInp) {
    if (input === "0") {
      input = currInp;
    }
    let match = input.match(/\d*\.*\d+$/);
    if (match && !/\./.test(match[0])) {
      this.setState({ input: input + ".", currentInput: currInp + "." });
    } else if (!/(\d$|\.$)/.test(input)) {
      this.setState({ input: input + "0.", currentInput: "0." });
    } else {
      this.handleError();
    }
  }

  operatorButtonOrKeyPressResponse(e, key, input, targetValue) {
    // eslint-disable-next-line default-case
    switch (key) {
      case 111:
        targetValue = "/";
        break;
      case 106:
        targetValue = "*";
        break;
      case 109:
        targetValue = "-";
        break;
      case 107:
        targetValue = "+";
        break;
    }

    let reg = new RegExp(`\\${targetValue}$`);

    if (reg.test(input)) {
      this.handleError();
    }

    if (e.target.id === "subtract" && /.*\d[+*/]$|.*\d$/.test(input)) {
      this.setState({
        input: input + targetValue,
        currentInput: targetValue,
      });
    } else {
      input = input.match(/.*\d/)[0];
      this.setState({
        input: input + targetValue,
        currentInput: targetValue,
      });
    }
  }

  digitsButtonOrKeyPressResponse(e, key, input, currInp, targetValue) {
    if (key) {
      targetValue = String.fromCharCode(key);
    }
    this.setState({
      input:
        input === "0" || input === "NaN" || input === "Infinity"
          ? targetValue
          : input + targetValue,
      currentInput:
        !/\.$|\d+$/.test(currInp) || currInp === "0"
          ? targetValue
          : currInp + targetValue,
    });
  }

  submitHandler(e) {
    if (e.type === "submit") {
      e.preventDefault();
    }
    let input = this.state.input;
    if (input && input !== "0") {
      input = input.match(/.*\d/);
      let outcome = calculate(input);
      if (/\./.test(outcome)) {
        outcome = Number(outcome).toPrecision(8);
        outcome = outcome.replace(/0+$|0+(?=e)/, "");
        if (/\.$/.test(outcome)) {
          outcome = outcome.slice(0, -1);
        }
      }
      this.setState({ input: outcome, currentInput: "" });

      if (input !== outcome) {
        let text = input + "";
        text = this.changeChars(text);
        $("#history").append(
          `<li><p class='input'>${text}</p><p class='output'>= ${outcome}</li>`
        );
      }
    }
  }

  transferEventToParent(e) {
    $(e.target).parent().click();
  }

  changeChars(str) {
    str = str.replace(/\//g, "÷");
    str = str.replace(/\*/g, "×");
    return str;
  }

  render() {
    let clk = this.handleClick;

    let forDisplay = this.changeChars(this.state.input);

    return (
      <div id="calculator">
        <Display input={forDisplay} />
        <InputDisplay
          onChange={this.handleChange}
          input={this.state.currentInput}
        />
        <Clear onClick={clk} />
        <BackSpace onClick={clk} />
        <Digits onClick={clk} />
        <Add onClick={clk} />
        <Subtract onClick={clk} />
        <Multiply onClick={clk} />
        <Divide onClick={clk} />
        <Decimal onClick={clk} />
        <Equals onClick={clk} />
        <History onClick={clk} />
        <HistoryButton onClick={clk} />
      </div>
    );
  }
}

export default App;
