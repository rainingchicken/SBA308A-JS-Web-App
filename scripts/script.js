//https://www.weather.gov/documentation/services-web-api#/default/alerts_query
//https://openweathermap.org/api

//imports
import { Forecast } from "./Forecast.js";
import { DivContainers } from "./DivContainers.js";
import { SubDivContainers } from "./subDivContainers.js";
//initializations
const API_KEY = "2d3f8e77a48455b0dce571edae173fdf";
//const anotherAPI_KEY = '0cf2a6a9651b76e68b7aa85cecda79a5'
const city = "Los Angeles";
const state = "CA";
const country = "US";
let countSlot = 0;
const app = document.getElementById("app");

const initialLoad = async () => {
  //fetch latitude and longitude
  const LatLonResponse = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=5&appid=${API_KEY}`
  );
  const LatLonData = await LatLonResponse.json();
  //console.log(LatLonData);
  let longitude = LatLonData[0].lon;
  let latitude = LatLonData[0].lat;

  //fetch weather data
  const weatherResponse = await fetch(
    `https://api.weather.gov/points/${latitude},${longitude}`
  );
  const weatherData = await weatherResponse.json();
  //console.log(weatherData);
  const forecast = weatherData.properties.forecast; //gets url to weekly forecast
  const hourlyForecast = weatherData.properties.forecastHourly; //gets url to hourly forecast
  const forecastTimeZone = weatherData.properties.timeZone; //gets America/Los Angeles

  //fetch forecast
  const forecastResponse = await fetch(`${forecast}`);
  const forecastData = await forecastResponse.json();
  const forecastInfo = forecastData.properties.periods; //bidaily forecast
  //console.log(forecastInfo);

  const forecastContainers = new DivContainers(forecastInfo.length);
  forecastContainers.createForcast();
  checkTime(forecastInfo);
  insertInfo(forecastInfo);

  //fetch hourly forecast
  const hourlyForecastResponse = await fetch(`${hourlyForecast}`);
  const forecastHourlyData = await hourlyForecastResponse.json();
  const forecastInfoHourly = forecastHourlyData.properties.periods;
  const firstHourlyForecastSlots = countDayHourlyForecast(
    forecastInfoHourly,
    forecastInfo
  );
  let hourlyForecastSlots = [firstHourlyForecastSlots, 24, 24, 24, 24, 24, 24];
  const divContainers = document.querySelectorAll(".container");
  const hourlyForecastContainers = new SubDivContainers(
    divContainers,
    hourlyForecastSlots
  );
  hourlyForecastContainers.createHourlyForecast();
};
initialLoad();

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

//count each days hourly forecast
const countDayHourlyForecast = (forecastInfoHourly, forecastInfo) => {
  let count = 0;
  let dayEndTime;
  if (!forecastInfo[0].isDaytime) {
    dayEndTime = forecastInfo[0].endTime;
  } else {
    dayEndTime = forecastInfo[1].endTime;
  }
  for (let hour = 0; hour < forecastInfoHourly.length; hour++) {
    if (forecastInfoHourly[hour].endTime !== dayEndTime) {
      count++;
    } else {
      return count;
    }
  }
};
