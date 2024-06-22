const formdiv = document.getElementById("form");
const all = formdiv.childrens;
const form = document.createElement("form");
const h1 = document.createElement("h1");
const inputEmail = document.createElement("input");
const inputPassword = document.createElement("input");
const inputSubmit = document.createElement("input");

//attributes and classes
formdiv.classList.add("font");
h1.classList.add("font");
inputEmail.classList.add("font");
inputPassword.classList.add("font");
inputSubmit.classList.add("font");
inputSubmit.classList.add("btn-light");
inputEmail.classList.add("input");
inputPassword.classList.add("input");
inputSubmit.classList.add("btn");
inputSubmit.classList.add("btn-light");
h1.innerHTML = `<a class='font' href='../pages/index.html'>1MTT</a>`;
inputEmail.setAttribute("type", "email");
inputPassword.setAttribute("type", "password");
inputSubmit.setAttribute("type", "button");
inputEmail.setAttribute("placeholder", "example@email.com");
inputPassword.setAttribute("placeholder", "password");
inputEmail.required = true;
inputPassword.required = true;
inputSubmit.value = "LOGIN";

//listeners
inputSubmit.addEventListener("click", function () {
  setTimeout(() => {
    window.location.href =
      "https://rainingchicken.github.io/SBA316-DOM-Typing-Test/pages/index.html";
  }, 0);

  window.alert(
    "This account does not exist. You will be directed to Home page"
  );
});

//appends
formdiv.appendChild(form);
form.appendChild(h1);
form.appendChild(inputEmail);
form.appendChild(inputPassword);
form.appendChild(inputSubmit);

//css
const fontClass = document.querySelectorAll(".font");
const inputClass = document.querySelectorAll(".input");
const home = h1.firstChild;
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

document.body.style.background = boxTexture;

for (const i in all) {
  Object.assign(all[i].style, {
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  });
}

Object.assign(formdiv.style, {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "20vh auto",
  width: "400px",
  height: "fit-content",
  backgroundColor: btnColor,
  boxShadow: "10px 5px 5px gray",
  borderRadius: "10px",
});

Object.assign(h1.style, {
  textAlign: "center",
  paddingTop: ".8em",
  fontSize: "3em",
});

Object.assign(home.style, {
  textDecoration: "none",
  color: "black",
});

for (const i of inputClass) {
  Object.assign(i.style, {
    display: "flex",
    width: "90%",
    margin: "1em auto",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5em",
    padding: ".5em 1em",
    lineHeight: "1.5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    border: "none",
  });
}

Object.assign(inputSubmit.style, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "2em auto",
});
