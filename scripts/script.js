//select elements
const app = document.getElementById("app");
const all = app.childrens;

//create elemetns
const header = document.createElement("header");
const nav = document.createElement("nav");
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
const wrong = "#BD8E83";
const navdiv = document.createElement("div");
const aHome = document.createElement("a");
const accountbtndiv = document.createElement("div");
const aLogin = document.createElement("a");
const aSignup = document.createElement("a");

//initializations
// https://gist.github.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80
const getQuotes = () => {
  fetch("../quotes.json")
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

//attributes and classes
accountbtndiv.setAttribute("id", "accountbtn");
nav.classList.add("navbar");
nav.classList.add("bg-transparent");

navdiv.classList.add("container-fluid");
navdiv.style.justifyContent = "space-between";

aHome.setAttribute("href", "../pages/index.html");
aHome.textContent = "Home";
aHome.classList.add("navbar-brand");
aHome.classList.add("text-black");

aLogin.setAttribute("href", "../pages/login.html");
aLogin.setAttribute("type", "button");
aLogin.style.border = "1px solid #749EB2";
aLogin.textContent = "Login";
aLogin.classList.add("btn");
aLogin.classList.add("text-black");

aSignup.textContent = "Sign Up";
aSignup.classList.add("btn");
aSignup.classList.add("navbar");
aSignup.setAttribute("href", "#");
aSignup.setAttribute("type", "button");
aSignup.style.backgroundColor = " #749EB2";

textarea.setAttribute("placeholder", "Click START and type here!");
textarea.disabled = true; //can't start typing before timer
textarea.classList.add("test");
textarea.classList.add("col");

writingPrompt.setAttribute("type", "text");
writingPrompt.setAttribute("id", "writingPrompt");
writingPrompt.textContent =
  "The prompt in which you will copy via typing will appear here. Try to type as fast and accurate as you can!";
writingPrompt.classList.add("test");
writingPrompt.classList.add("col");

h1.textContent = "1-minute Typing Test";

btn.textContent = "START";

minutesdiv.textContent = "01:";
secondsdiv.textContent = "00";

resultdiv.textContent = "Result";

footer.innerHTML = `<a id='footeranchor' href='https://github.com/rainingchicken/SBA316-DOM-Typing-Test'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
</svg> rainingchicken</a>`;

testrow.classList.add("row");
testcontainer.classList.add("container");

app.classList.add("font");

const calculateWPM = () => {
  let count = 0;
  let newhtml = "";
  const test = writingPrompt.textContent;
  const input = textarea.value;
  const testArr = test.trim().split(/\s+/);
  const inputArr = input.trim().split(/\s+/);
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i] != testArr[i]) {
      count += 0;
      newhtml += `<span style="color: ${wrong};">${testArr[i]}</span>` + " ";
    } else {
      count++;
      newhtml += `<span style="color: white;">${testArr[i]}</span>` + " ";
    }
  }
  writingPrompt.innerHTML = newhtml;
  resultdiv.textContent = count;
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
    window.scrollTo({ top: 0, behavior: "smooth" }); //scroll to top pf page to see score
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (seconds <= 5) {
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
    intervalID = setInterval(updateTimer, 1000);
  }
  isBtnDisabled = true; //can't click on timer during countdown to prevent weird setInterval
};

//listeners
btn.addEventListener("click", handleTimer);
aSignup.addEventListener("click", function () {
  window.alert("Sign ups are unavailable at this time.");
});

//appends to
nav.appendChild(navdiv);
navdiv.appendChild(aHome);
navdiv.appendChild(accountbtndiv);
accountbtndiv.appendChild(aLogin);
accountbtndiv.appendChild(aSignup);
header.appendChild(nav);
timerdiv.appendChild(minutesdiv);
timerdiv.appendChild(secondsdiv);
buttonsdiv.appendChild(btn);
testrow.appendChild(writingPrompt);
testrow.appendChild(textarea);
testcontainer.appendChild(testrow);
app.appendChild(header);
app.appendChild(h1);
app.appendChild(timerdiv);
app.appendChild(buttonsdiv);
app.appendChild(resultdiv);
app.appendChild(testcontainer);
app.appendChild(footer);

//css
const testClass = document.querySelectorAll(".test");
const fontClass = document.querySelectorAll(".font");
const whiteClass = document.querySelectorAll(".white");
const redClass = document.querySelectorAll(".red");
const links = nav.querySelectorAll("a");
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
    alignItems: "center",
    justifyContent: "center",
  });
}

Object.assign(accountbtndiv.style, {
  display: "flex",
  alignItems: "center",
});

Object.assign(aLogin.style, {
  margin: "0 .4em",
  padding: ".5em",
});

Object.assign(aSignup.style, {
  margin: "0 .4em",
  padding: ".5em",
});

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
  bottom: "0",
});

Object.assign(footer.style, {
  textAlign: "center",
  margin: "0 auto",
  bottom: "0",
  padding: "1em",
});

Object.assign(footeranchor.style, {
  textDecoration: "none",
  color: btnColor,
});

for (const i of whiteClass) {
  Object.assign(i.style, {
    color: "white",
  });
}

for (const i of redClass) {
  Object.assign(i.style, {
    color: wrong,
  });
}
