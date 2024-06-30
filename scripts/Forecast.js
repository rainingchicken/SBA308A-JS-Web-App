export class Forecast {
  //field

  //constructor
  constructor(dayTime, temperature, shortForecast, rain, wind) {
    this.dayTime = dayTime;
    this.temperature = temperature;
    this.shortForecast = shortForecast;
    this.rain = rain;
    this.wind = wind;
  }

  //methods
  createOverview(parentEl) {
    const dayTimeEl = document.createElement("h2");
    const temperatureEl = document.createElement("h1");
    const shortForecastEL = document.createElement("h3");
    const rainEL = document.createElement("h5");
    const windEL = document.createElement("h5");

    dayTimeEl.textContent = this.dayTime;
    temperatureEl.textContent = this.temperature;
    shortForecastEL.textContent = this.shortForecast;
    rainEL.textContent = this.rain;
    windEL.textContent = this.wind;

    parentEl.appendChild(dayTimeEl);
    parentEl.appendChild(temperatureEl);
    parentEl.appendChild(shortForecastEL);
    parentEl.appendChild(rainEL);
    parentEl.appendChild(windEL);
  }
}
