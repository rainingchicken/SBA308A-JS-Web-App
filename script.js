//select elements
const app = document.getElementById("app");
const all = app.childrens;

//create elemetns
const h1 = document.createElement("h1");
const timerdiv = document.createElement("div");
const minutesdiv = document.createElement("span");
const secondsdiv = document.createElement("span");
const buttonsdiv = document.createElement("div");
const resultdiv = document.createElement("div");
const btn = document.createElement("button");
const writingPrompt = document.createElement("div");
const textarea = document.createElement("textarea");
const testcontainer = document.createElement("div");
const testrow = document.createElement("div");
const footer = document.createElement("footer");
//initializations
// https://gist.github.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80
const getQuotes = () => {
  fetch("./quotes.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      writingPrompt.textContent = "";
      for (let index = 0; index < 10; index++) {
        let rand = Math.floor(Math.random() * 100);
        writingPrompt.textContent += data.quotes[rand].quote + " ";
      }
    })
    .catch((error) => console.error("Unable to fetch data:", error));
};

let minutes = 0;
let seconds = 60;
let intervalID;
let isBtnDisabled = false;

//attributes
textarea.disabled = true; //can't start typing before timer
writingPrompt.setAttribute("type", "text");
writingPrompt.textContent =
  "The prompt in which you will copy via typing will appear here. Try to type as fast and accurate as you can!";
textarea.setAttribute("placeholder", "Click START and type here!");
h1.textContent = "1-minute Typing Test";
btn.textContent = "START";
minutesdiv.textContent = "01:";
secondsdiv.textContent = "00";
resultdiv.textContent = "Result";
footer.innerHTML = `<a>https://github.com/rainingchicken/SBA316-DOM-Typing-Test</a>`;

//class
writingPrompt.classList.add("test");
textarea.classList.add("test");
writingPrompt.classList.add("col");
textarea.classList.add("col");
testrow.classList.add("row");
testcontainer.classList.add("container");
app.classList.add("font");

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
    } else {
      writingPrompt.innerHTML = writingPrompt.innerHTML.replace(
        wordPrompt,
        `<span style='color: #BD8E83'>${wordPrompt}</span>`
      );
    }
  }
  resultdiv.innerHTML = count + " WPM";
};

const updateTimer = () => {
  minutesdiv.textContent = "00:";

  if (seconds === 0) {
    //when times up
    let audio = new Audio(
      "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
    );
    audio.play();
    clearInterval(intervalID); //stop timer
    calculateWPM(); //calculate
    textarea.disabled = true; //can't type futher
    isBtnDisabled = false;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (seconds < 5) {
    timerdiv.style.color = "#BD8E83";
  } else {
    timerdiv.style.color = "black";
  }
  secondsdiv.textContent = seconds;
  seconds--;
};

const handleTimer = () => {
  textarea.disabled = false;
  textarea.focus();
  textarea.value = "";
  getQuotes();
  if (!isBtnDisabled) {
    seconds = 59;
    intervalID = setInterval(updateTimer, 50);
  }
  isBtnDisabled = true; //can't click on timer during countdown to prevent weird setInterval
};

btn.addEventListener("click", handleTimer);

//appends to app
timerdiv.appendChild(minutesdiv);
timerdiv.appendChild(secondsdiv);
buttonsdiv.appendChild(btn);
testrow.appendChild(writingPrompt);
testrow.appendChild(textarea);
testcontainer.appendChild(testrow);
app.appendChild(h1);
app.appendChild(timerdiv);
app.appendChild(buttonsdiv);
app.appendChild(resultdiv);
app.appendChild(testcontainer);
app.appendChild(footer);
//css
const testClass = document.querySelectorAll(".test");
const fontClass = document.querySelectorAll(".font");

//https://www.canva.com/colors/color-palettes/classic-travel/
const bgColor = "#E9DAC4";
const boxColor = "white";
const boxTexture =
  "url(https://images.pexels.com/photos/20818860/pexels-photo-20818860/free-photo-of-white-wrinkled-paper-sheet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)";
const btnColor = "#749EB2";
const shadow = "#AC8E60";

for (const i of fontClass) {
  Object.assign(i.style, {
    fontFamily: "'Chakra Petch', sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
  });
}

document.body.style.backgroundColor = bgColor;

Object.assign(app.style, {
  marginTop: "0",
});

for (const i in all) {
  Object.assign(all[i].style, {
    boxSizing: "border-box",
    // display: "flex",
    // flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  });
}

Object.assign(h1.style, {
  textAlign: "center",
  margin: "1em auto",
  marginBottom: "0",
});

Object.assign(timerdiv.style, {
  display: "inline-block",
  fontSize: "3em",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  margin: "0 auto",
  width: "100%",
});
Object.assign(buttonsdiv.style, {
  textAlign: "center",

  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  margin: "0 auto",
  display: "flex",
});
Object.assign(btn.style, {
  padding: "1em",
  borderRadius: "20px",
  margin: ".5em auto",
  border: "none",
  backgroundColor: btnColor,
});
Object.assign(resultdiv.style, {
  textAlign: "center",
  margin: "0 auto",
  fontSize: "2em",
});
for (const i of testClass) {
  Object.assign(i.style, {
    //background: boxTexture,
    backgroundColor: boxColor,
    backgroundBlendMode: "multiply",
    padding: "2em",
    margin: ".5em",
    fontSize: "1.5em",
    lineHeight: "1.5",
    borderRadius: "20px",
    boxShadow: "10px 5px 5px" + shadow,
  });
}
Object.assign(footer.style, {
  textAlign: "center",
  margin: "0 auto",
  width: "100%",
  bottom: "0",
  backgroundColor: "red",
});
