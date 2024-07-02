//https://www.weather.gov/documentation/services-web-api#/default/alerts_query
//https://openweathermap.org/api

//imports
import { Input } from "./Input.js";
import { Forecast } from "./Forecast.js";
import { DivContainers } from "./DivContainers.js";
import { SubDivContainers } from "./subDivContainers.js";
import { Location } from "./Location.js";

//initializations
const API_KEY = "2d3f8e77a48455b0dce571edae173fdf";
//const anotherAPI_KEY = '0cf2a6a9651b76e68b7aa85cecda79a5'
let city = "Dallas";
let state = "TX";
const country = "US";

const app = document.getElementById("app");

const inputs = new Input();
inputs.createInputs();

const initialLoad = async (city, state) => {
  //fetch latitude and longitude
  const LatLonResponse = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=5&appid=${API_KEY}`
  );
  const LatLonData = await LatLonResponse.json();
  //console.log(LatLonData);
  if (LatLonData.length == 0) {
    setTimeout(() => {
      alert("Invalid city and/or state");
      window.location.reload();
      throw new Error("Invalid city and/or state");
    }, 0);
  }
  let longitude = LatLonData[0].lon;
  let latitude = LatLonData[0].lat;
  let cityName = LatLonData[0].name;
  let stateName = LatLonData[0].state;
  const location = new Location(cityName, stateName);
  location.createLocation();

  //fetch weather data
  const weatherResponse = await fetch(
    `https://api.weather.gov/points/${latitude},${longitude}`
  );
  const weatherData = await weatherResponse.json();
  const forecast = weatherData.properties.forecast; //gets url to weekly forecast
  const hourlyForecast = weatherData.properties.forecastHourly; //gets url to hourly forecast
  //console.log(weatherData);

  //fetch forecast
  const forecastResponse = await fetch(`${forecast}`);
  const forecastData = await forecastResponse.json();
  const forecastInfo = forecastData.properties.periods; //bidaily forecast
  //console.log(forecastData);

  const forecastContainers = new DivContainers(forecastInfo.length);
  forecastContainers.createForcast();
  checkTime(forecastInfo);
  const dayNightContainers = document.querySelectorAll(".childContainer");
  insertInfo(forecastInfo, dayNightContainers);

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
  const hourlyContainers = document.querySelectorAll(".hourlySlot");
  insertInfo(forecastInfoHourly, hourlyContainers);
};
initialLoad(city, state);

const insertInfo = (forecastType, containers) => {
  containers.forEach((containerEl, index) => {
    //get dayname
    let forecastDayName;
    if (forecastType.length <= 14) {
      forecastDayName = forecastType[index].name;
    } else {
      let startTime = forecastType[index].startTime;
      let time = new Date(startTime).getHours();
      if (time > 12) {
        time = `${time - 12} PM`;
      } else {
        time = `${time} AM`;
      }
      forecastDayName = time;
    }

    //const forecastDayName = forecastType[index].name;

    //get temperature
    const forecastTemperature = forecastType[index].temperature;
    const forecastTemperatureUnit = forecastType[index].temperatureUnit;
    const forecastTemp = `${forecastTemperature}°${forecastTemperatureUnit}`;

    //get shortforecast
    const forecastShortForecast = forecastType[index].shortForecast;

    //get rain possibility
    let forecastRain = forecastType[index].probabilityOfPrecipitation.value;
    if (!forecastRain) {
      forecastRain = `0% Rain`;
    } else {
      forecastRain = `${forecastRain}% Rain`;
    }

    //get wind
    const forecastWindSpeed = forecastType[index].windSpeed;
    const forecastWindDirection = forecastType[index].windDirection;
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
    if (forecastInfoHourly[hour].endTime != dayEndTime) {
      count++;
    } else {
      return count;
    }
  }
};

//clear all created containers and timeZone label
const submitButton = document.querySelector(".submitButton");
const inputCity = document.querySelector(".city");
const inputState = document.querySelector(".state");
submitButton.addEventListener("click", function () {
  const all = document.querySelectorAll(".container, .subContainers");
  const location = document.querySelector(".location");
  location.remove();
  for (const element of all) {
    element.remove();
  }
  city = inputCity.value;
  state = inputState.value;
  if (city == "" || state == "") {
    alert("Please input city and state");
    window.location.reload();
  }
  initialLoad(city, state);
});

//if subcontainer has anothing then disable div toggle
//style page
//toggle hourly forecasts
//fetch error not doneeeeeeeeeeeee
