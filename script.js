const app = document.getElementById("app");
const all = document.querySelectorAll("*");

const timerdiv = document.createElement("div");
const minutesdiv = document.createElement("div");
const secondsdiv = document.createElement("div");
const buttonsdiv = document.createElement("div");
const btn = document.createElement("button");
const writingPrompt = document.createElement("div");
const textarea = document.createElement("textarea");

let string = "This is a typing test.";
let minutes = 0;
let seconds = 60;
//attributes
writingPrompt.setAttribute("type", "text");
writingPrompt.textContent = string;

textarea.setAttribute("cols", 50);
textarea.setAttribute("rows", 20);
minutesdiv.textContent = "1:";
secondsdiv.textContent = "00";
const decrement = () => {
  seconds -= 1;
  secondsdiv.innerHTML = seconds;
  if (seconds == 0) {
    calculateWPM();
    clearInterval(timer);
  }
};
const timer = () => {
  setInterval(decrement, 1000);
};
timerdiv.appendChild(minutesdiv);
timerdiv.appendChild(secondsdiv);
btn.addEventListener("click", timer);
//appending to app div
app.appendChild(timerdiv);

app.appendChild(btn);
app.appendChild(writingPrompt);
app.appendChild(textarea);

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
