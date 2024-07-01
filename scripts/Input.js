export class Input {
  //field

  //constructor
  constructor() {}

  //methods
  createInputs() {
    const form = document.createElement("form");
    const inputCity = document.createElement("input");
    const inputState = document.createElement("input");
    const submitButton = document.createElement("button");
    form.classList.add("form");
    inputCity.classList.add("city");
    inputState.classList.add("state");
    submitButton.classList.add("submitButton");

    form.appendChild(inputCity);
    form.appendChild(inputState);
    form.appendChild(submitButton);
    app.appendChild(form);
  }

  get city() {
    const submitButton = document.querySelector(".submitButton");
    submitButton.addEventListener("click", function (event) {
      city = event.target.value;
      return city;
    });
  }

  get state() {
    const submitButton = document.querySelector(".submitButton");
    submitButton.addEventListener("click", function (event) {
      state = event.target.value;
      return state;
    });
  }
}
