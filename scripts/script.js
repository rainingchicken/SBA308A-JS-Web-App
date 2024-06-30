//https://www.weather.gov/documentation/services-web-api#/default/alerts_query
//https://openweathermap.org/api

//imports
import { Forecast } from "./Forecast.js";
import { DivContainers } from "./DivContainers.js";

//initializations
const API_KEY = "2d3f8e77a48455b0dce571edae173fdf";
const city = "Los Angeles";
const state = "CA";
const country = "US";
const app = document.getElementById("app");

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
  console.log(forecastInfo);

  const forecastContainers = new DivContainers(forecastInfo.length);
  forecastContainers.createForcast();
  checkTime(forecastInfo);
  insertInfo(forecastInfo);
};
initialLoad();

//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API

const insertInfo = (forecastInfo) => {
  const dayNightContainers = document.querySelectorAll(".childContainer");
  dayNightContainers.forEach((containerEl, index) => {
    //get dayname
    const forecastDayName = forecastInfo[index].name;

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
      forecastDayName,
      forecastTemp,
      forecastShortForecast,
      forecastRain,
      forecastWind
    );
    forecastOverview.createOverview(containerEl);
  });
};

//if first object of forecastInfo shows the night forecast, then remove the day forecast
const checkTime = (forecastInfo) => {
  if (!forecastInfo[0].isDaytime) {
    //console.log(forecastInfo[0].isDaytime);
    const parentContainer = document.getElementsByClassName("container")[0];
    const todayDayContainer = document.querySelector(".childContainer");

    parentContainer.removeChild(todayDayContainer);

    const tonightContainer = document.querySelector(".childContainer");
    const containerWidth = "var(--containerWidth)";
    tonightContainer.style.maxWidth = containerWidth;
  }
};
