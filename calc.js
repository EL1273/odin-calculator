/* Calculator Backend Functions*/

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let fst = "";
let op = "";
let snd = "";

function operate(v1, op, v2) {
  if (op === '+') {
    return add(v1, v2);
  } else if (op === "-") {
    return subtract(v1, v2);
  } else if (op === "*") {
    return multiply(v1, v2);
  } else if (op === "/") {
    return divide(v1, v2);
  }
}

let displayText = "";
let display = document.querySelector('#display');
/* Make Calculator Buttons */
const calcContainer = document.querySelector("#calc-container");
const r1 = document.querySelector("#r1");
const r2 = document.querySelector("#r2");
const r3 = document.querySelector("#r3");
const r4 = document.querySelector("#r4");
const r5 = document.querySelector("#r5");

function makeButton(s, r, type) {
  let button = document.createElement('button');
  button.textContent = s;
  button.classList.add(s);
  button.classList.add("calc-button")
  r.appendChild(button);
  if (type === "num") {
    button.addEventListener(('click'), () => {
      if (op === "") {
        if (fst.length <= 7 && (fst.charAt(fst.length - 1) !== "0") || (fst.includes("."))) {
          fst += s;
          displayText = fst;
          display.textContent = displayText;
        }
      } else {
        if (snd.length <= 7 && (fst.charAt(fst.length - 1) !== "0") || (fst.includes("."))) {
          snd += s;
          displayText = snd;
          display.textContent = displayText;
        }
      }
      console.log(fst);
      console.log(op);
      console.log(snd);
    });
  } else if (type === "op") {
    button.addEventListener(('click'), () => {
      if ((op === "" && s !== "=") || (fst !== "" && op !== "" && snd === "")) {
        op = s;
      } else if (fst !== "" && snd !== "" && op !== "") {
        if (op === "/" && (snd === "0" || snd === "0.")) {
          fst = "";
          snd = "";
          op = "";
          displayText = "Dividing by zero???";
          display.textContent = displayText;
        }
        console.log(parseFloat(fst));
        console.log(op);
        console.log(parseFloat(snd))
        let newVal = operate(parseFloat(fst), op, parseFloat(snd));
        console.log(newVal);
        let str = newVal.toString();
        if (str.length - str.indexOf(".") > 8) {
          str = str.substring(0, str.indexOf(".") + 7);
        }
        fst = str;
        display.textContent = fst;
        snd = "";
        if (s !== "=") {
          op = s;
        } else {
          op = "";
        }
      }
      console.log(fst);
      console.log(op);
      console.log(snd);
    });
  } else if (type === "clear") {
    button.addEventListener(('click'), () => {
      displayText = "";
      display.textContent = displayText;
      fst = "";
      op = "";
      snd = "";
    });
  } else if (type === "delete") {
    button.addEventListener(('click'), () => {
      if (snd.length > 0) {
        snd = snd.substring(0, displayText.length - 1);
        displayText = snd;
        display.textContent = displayText;
      } else if (fst.length > 0) {
        fst = fst.substring(0, displayText.length - 1);
        displayText = fst;
        display.textContent = displayText;
      } else {
        op = "";
      }
      console.log(fst);
      console.log(op);
      console.log(snd);
    });
  } else if (type === ".") {
    button.addEventListener(('click'), () => {
      if (!snd.includes(".") && snd.length > 0) {
        snd += ".";
        displayText = snd;
        display.textContent = displayText;
      } else if (!fst.includes(".") && fst.length > 0) {
        fst += ".";
        displayText = fst;
        display.textContent = displayText;
      }
      console.log(fst);
      console.log(op);
      console.log(snd);
    });
  } else if (type === "+/-") {
    button.addEventListener(('click'), () => {
      if (snd.length > 0) {
        if (snd.charAt(0) === "-") {
          snd = snd.substring(1);
        } else {
          snd = "-" + snd;
        }
        displayText = snd;
        display.textContent = displayText;
      } else if (fst.length > 0) {
        if (fst.charAt(0) === "-") {
          fst = fst.substring(1);
        } else {
          fst = "-" + fst;
        }
        displayText = fst;
        display.textContent = displayText;
      }
      console.log(fst);
      console.log(op);
      console.log(snd);
    });
  } else if (type === "%") {
    button.addEventListener(('click'), () => {
      if (snd.length > 0) {

        str = (parseFloat(snd) / 100).toString();
        if (str.length - str.indexOf(".") > 8) {
          str = str.substring(0, str.indexOf(".") + 7);
        }
        snd = str;
        displayText = snd;
        display.textContent = displayText;
      } else if (fst.length > 0) {
        str = (parseFloat(snd) / 100).toString();
        if (str.length - str.indexOf(".") > 8) {
          str = str.substring(0, str.indexOf(".") + 7);
        }
        fst = (parseFloat(fst) / 100).toString();
        displayText = fst;
        display.textContent = displayText;
      }
      console.log(fst);
      console.log(op);
      console.log(snd);
    });
  }
}

function makeCalc() {
  makeButton("AC", r1, "clear");
  makeButton("+/-", r1, "+/-");
  makeButton("%", r1, "%");
  makeButton("/", r1, "op");
  makeButton("9", r2, "num");
  makeButton("8", r2, "num");
  makeButton("7", r2, "num");
  makeButton("*", r2, "op");
  makeButton("6", r3, "num");
  makeButton("5", r3, "num");
  makeButton("4", r3, "num");
  makeButton("-", r3, "op");
  makeButton("3", r4, "num");
  makeButton("2", r4, "num");
  makeButton("1", r4, "num");
  makeButton("+", r4, "op");
  makeButton("0", r5, "num");
  makeButton(".", r5, ".");
  makeButton("=", r5, "op");
  makeButton("del", r5, "delete");
}

function setup() {
  makeCalc();
}