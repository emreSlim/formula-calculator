export default function calculate(str) {
  let string = str + "";
  const numfy = (str) => {
    if (!/e/.test(str)) {
      return str.match(/-{0,1}\d+\.*\d*/g).map((num) => Number(num));
    } else {
      return str
        .match(/\d*\.*\d*e[+-]\d+|\d*\.*\d+$/g)
        .map((num) => Number(num));
    }
  };

  while (/\//.test(string)) {
    let reg = /-*\d*\.*\d*(e[-+])*\d+\/-*\d*\.*\d*(e[-+])*\d+/;
    let part = string.match(reg)[0];
    let arr = numfy(part);
    let output = arr[0] / arr[1];
    output = output.toFixed(15) * 1;
    string = string.replace(reg, String(output));
  }
  while (/\*/.test(string)) {
    let reg = /-*\d*\.*\d*(e[-+])*\d+\*-*\d*\.*\d*(e[-+])*\d+/;
    let part = string.match(reg);
    let arr = numfy(part[0]);
    let output = arr[0] * arr[1];
    output = output.toFixed(15) * 1;
    string = string.replace(reg, String(output));
  }
  while (/(?<!e)\+/.test(string)) {
    let reg = /-*\d*\.*\d*(e[-+])*\d+\+-*\d*\.*\d*(e[-+])*\d+/;
    let part = string.match(reg);

    let arr = numfy(part[0]);

    let output = arr[0] + arr[1];
    output = output.toFixed(15) * 1;
    if (part.index > 0) {
      output = "+" + output;
    }
    string = string.replace(reg, output);
  }
  while (/(?<!e)-/.test(string)) {
    let reg = /\d*\.*\d*(e[-+])*\d+-\d*\.*\d*(e[-+])*\d+/;
    let part = string.match(reg);
    if (!part) {
      break;
    }
    let arr = numfy(part[0]);

    let output = arr[0] + arr[1];

    string = string.replace(reg, String(output));
  }

  return string;
}
