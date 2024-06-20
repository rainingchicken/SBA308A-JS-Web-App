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
// https://gist.github.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80
const getQuotes = () => {
  fetch("./quotes.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (let index = 0; index < 10; index++) {
        let rand = Math.floor(Math.random() * 100);
        writingPrompt.textContent += data.quotes[rand].quote + " ";
      }
    })
    .catch((error) => console.error("Unable to fetch data:", error));
};
getQuotes();
let string = "rnaodm random random";
let minutes = 0;
let seconds = 60;
let intervalID;
let isBtnDisabled = false;

//attributes
writingPrompt.setAttribute("type", "text");

textarea.setAttribute("cols", 50);
textarea.setAttribute("rows", 20);
textarea.disabled = true; //can't start typing before timer
minutesdiv.textContent = "1:";
secondsdiv.textContent = "00";

resultdiv.textContent = "result";

const calculateWPM = () => {
  let count = 0;
  const test = writingPrompt.textContent;
  const input = textarea.value;
  let testArr = test.split(" ");
  let inputArr = input.split(" ");
  for (let i = 0; i < inputArr.length; i++) {
    word = inputArr[i];
    wordPrompt = testArr[i];
    if (word === wordPrompt) {
      //count word if input and prompt words are equal
      count++;
    }
    //add changing color of mistyping here
  }

  resultdiv.innerHTML = count + " WPM";
};

const updateTimer = () => {
  if (seconds === 0) {
    //when times up
    clearInterval(intervalID); //stop timer
    calculateWPM(); //calculate
    textarea.disabled = true; //can't type futher
    isBtnDisabled = false;
  }
  secondsdiv.textContent = seconds;
  seconds--;
};

const handleTimer = () => {
  textarea.disabled = false;
  textarea.focus();
  textarea.value = "";
  if (!isBtnDisabled) {
    seconds = 60;
    intervalID = setInterval(updateTimer, 500);
  }
  isBtnDisabled = true; //can't click on timer during countdown to prevent weird setInterval
};

//appends
// timerdiv.appendChild(minutesdiv);

btn.addEventListener("click", handleTimer);

//appends to app
app.appendChild(timerdiv);
app.appendChild(btn);
app.appendChild(resultdiv);
app.appendChild(writingPrompt);
app.appendChild(textarea);
timerdiv.appendChild(secondsdiv);
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
