//select elements
const app = document.getElementById("app");
const all = document.querySelectorAll("*");

//create elemetns
const timerdiv = document.createElement("div");
const minutesdiv = document.createElement("div");
const secondsdiv = document.createElement("div");
const buttonsdiv = document.createElement("div");
const resultdiv = document.createElement("div");
const btn = document.createElement("button");
const writingPrompt = document.createElement("div");
const textarea = document.createElement("textarea");

//initializations
let string = "This is a typing test.";
let minutes = 0;
let seconds = 60;
let intervalID;

//attributes
writingPrompt.setAttribute("type", "text");
writingPrompt.textContent = string;

textarea.setAttribute("cols", 50);
textarea.setAttribute("rows", 20);
minutesdiv.textContent = "1:";
secondsdiv.textContent = "00";

resultdiv.textContent = "result";

const calculateWPM = () => {
  let count = 0;
  const test = writingPrompt.textContent;
  const input = textarea.value;
  let testArr = test.split(" ");
  let inputArr = input.split(" ");
  inputArr.forEach((word) => {
    for (const i in testArr) {
      wordPrompt = testArr[i];
      if (word === wordPrompt) {
        count++;
      }
      //add changing color of mistyping here
    }
  });
  resultdiv.innerHTML = count;
};

const updateTimer = () => {
  if (seconds === 0) {
    clearInterval(intervalID);
    calculateWPM();
  }
  secondsdiv.textContent = seconds;
  seconds--;
};

const handleTimer = () => {
  seconds = 60;
  intervalID = setInterval(updateTimer, 50);
};

//css
for (const iterator of all) {
  Object.assign(iterator.style, {
    boxSizing: "border-box",
    // display: "flex",
  });
}

Object.assign(app.style, {
  backgroundColor: "gray",
  width: "100%",
  height: "100vh",
  margin: "0",
  padding: "0",
});
Object.assign(writingPrompt.style, {
  backgroundColor: "yellow",
  width: "70%",
  height: "30vh",
});

Object.assign(textarea.style, {
  backgroundColor: "red",
});

//appends
// timerdiv.appendChild(minutesdiv);
timerdiv.appendChild(secondsdiv);
btn.addEventListener("click", handleTimer);

//appends to app
app.appendChild(timerdiv);
app.appendChild(btn);
app.appendChild(resultdiv);
app.appendChild(writingPrompt);
app.appendChild(textarea);
