export class DivContainers {
  //field

  //constructor
  constructor(periodLength) {
    this.periodLength = periodLength;
  }
  //methods
  createForcast = () => {
    //2 because data gives night and day forecasts
    for (let daysNum = 0; daysNum < this.periodLength / 2; daysNum++) {
      const weatherContainer = document.createElement("div");
      const dayContainer = document.createElement("div");
      const nightContainer = document.createElement("div");

      weatherContainer.classList.add("container", "clickable");
      dayContainer.classList.add("dayContainer", "childContainer");
      nightContainer.classList.add("nightContainer", "childContainer");

      weatherContainer.appendChild(dayContainer);
      weatherContainer.appendChild(nightContainer);
      app.appendChild(weatherContainer);
    }
  };
}
