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

    inputCity.setAttribute("type", "input");
    inputCity.required = true;
    inputCity.setAttribute("placeholder", "Full City Name");
    inputState.setAttribute("type", "input");
    inputState.required = true;
    inputState.setAttribute("placeholder", "State");
    submitButton.setAttribute("type", "button");

    form.classList.add("form");
    inputCity.classList.add("city");
    inputState.classList.add("state");
    submitButton.classList.add("submitButton");

    form.appendChild(inputCity);
    form.appendChild(inputState);
    form.appendChild(submitButton);
    app.appendChild(form);
  }
}
