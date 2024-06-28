//https://www.weather.gov/documentation/services-web-api#/default/alerts_query
//https://openweathermap.org/api

const API_KEY = "2d3f8e77a48455b0dce571edae173fdf";
const city = "Los Angeles";
const state = "CA";
const country = "US";
const initialLoad = async () => {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=5&appid=${API_KEY}`
    //api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0cf2a6a9651b76e68b7aa85cecda79a5
  );
  const data = await res.json();
  //console.log(data);
  let longitude = data[0].lon;
  let latitude = data[0].lat;
  const response = await fetch(
    `https://api.weather.gov/points/${latitude},${longitude}`
  );
  const jsonData = await response.json();
  //console.log(jsonData);
  let forecast = jsonData.properties.forecast;
  //console.log(forecast);
  const r = await fetch(`${forecast}`);
  const d = await r.json();
  const forecastInfo = d.properties.periods;
  //console.log(forecastInfo);
  createForcast(forecastInfo.length);
  insertInfo(forecastInfo);
};
initialLoad();

//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
const app = document.getElementById("app");
const createForcast = (periodLength) => {
  //2 because data gives night and day forecasts
  for (let daysNum = 0; daysNum < periodLength / 2; daysNum++) {
    const weatherContainer = document.createElement("div");
    const dayContainer = document.createElement("div");
    const nightContainer = document.createElement("div");

    weatherContainer.classList.add("container");
    dayContainer.classList.add("dayContainer", "childContainer");
    nightContainer.classList.add("nightContainer", "childContainer");

    weatherContainer.appendChild(dayContainer);
    weatherContainer.appendChild(nightContainer);
    app.appendChild(weatherContainer);
  }
};

class Forecast {
  //field

  //constructor
  constructor(temperature, shortForecast, rain, wind) {
    this.temperature = temperature;
    this.shortForecast = shortForecast;
    this.rain = rain;
    this.wind = wind;
  }

  //methods
  createOverview(parentEl) {
    const temperatureEl = document.createElement("h1");
    const shortForecastEL = document.createElement("h3");
    const rainEL = document.createElement("h5");
    const windEL = document.createElement("h5");

    temperatureEl.textContent = this.temperature;
    shortForecastEL.textContent = this.shortForecast;
    rainEL.textContent = this.rain;
    windEL.textContent = this.wind;

    parentEl.appendChild(temperatureEl);
    parentEl.appendChild(shortForecastEL);
    parentEl.appendChild(rainEL);
    parentEl.appendChild(windEL);
  }
}

const insertInfo = (forecastInfo) => {
  const dayNightContainers = document.querySelectorAll(".childContainer");
  dayNightContainers.forEach((containerEl, index) => {
    //get temperature
    const forecastTemperature = forecastInfo[index].temperature;
    const forecastTemperatureUnit = forecastInfo[index].temperatureUnit;
    const forecastTemp = `${forecastTemperature}°${forecastTemperatureUnit}`;
    //get shortforecast
    const forecastShortForecast = forecastInfo[index].shortForecast;

    //get rain possibility
    let forecastRain = forecastInfo[index].probabilityOfPrecipitation.value;
    if (!forecastRain) {
      forecastRain = `0% Rain`;
    } else {
      forecastRain = `${forecastRain}% Rain`;
    }

    //get wind
    const forecastWindSpeed = forecastInfo[index].windSpeed;
    const forecastWindDirection = forecastInfo[index].windDirection;
    const forecastWind = `${forecastWindSpeed} ${forecastWindDirection} wind`;

    const forecastOverview = new Forecast(
      forecastTemp,
      forecastShortForecast,
      forecastRain,
      forecastWind
    );
    forecastOverview.createOverview(containerEl);
  });
};
