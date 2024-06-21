const header = document.createElement("header");
const nav = document.createElement("nav");

//attributes
nav.innerHTML = `<nav class="navbar bg-transparent ">
  <div class="container-fluid style='justify-content: space-between'">
    <a class="navbar-brand text-black" href="../pages/index.html">Home</a>
    <div id="accountbtn">
    <a href = '../pages/login.html' type="button" class="btn  text-black" style='border: 1px solid #749EB2'>Login</a>
    <a type="button" class="btn text-black"style='background-color: #749EB2'>Sign Up</a>
    </div>
  </div>
</nav>`;

header.appendChild(nav);
app.appendChild(header);
