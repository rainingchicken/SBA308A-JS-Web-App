//https://www.weather.gov/documentation/services-web-api#/default/alerts_query
//https://openweathermap.org/api

//imports
import { Input } from "./Input.js";
import { Forecast } from "./Forecast.js";
import { DivContainers } from "./DivContainers.js";
import { SubDivContainers } from "./SubDivContainers.js";
import { Location } from "./Location.js";

//initializations
const API_KEY = "668485130ace1696841598qug4b1ed1";
//"2d3f8e77a48455b0dce571edae173fdf";
//const anotherAPI_KEY = '0cf2a6a9651b76e68b7aa85cecda79a5'
let city = "Dallas"; //default city
let state = "TX"; //default state
const country = "US";

const app = document.getElementById("app");
const footer = document.createElement("footer");
const title = document.createElement("h1");
const subTitle = document.createElement("h3");

title.classList.add("title");
title.textContent = "Weather App";

subTitle.classList.add("subTitle");
subTitle.textContent = "Check the weather at any US city!";

app.appendChild(title);
app.appendChild(subTitle);

footer.innerHTML = `<a id='footeranchor' href='https://github.com/rainingchicken/SBA308A-JS-Web-App'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
</svg> rainingchicken</a>`;

const inputs = new Input();
inputs.createInputs();

const initialLoad = async (city, state) => {
  //fetch latitude and longitude
  //const LatLonResponse = await fetch(
  //   `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=5&appid=${API_KEY}`
  // );
  const LatLonResponse = await fetch(
    `https://geocode.maps.co/search?q=${city},${state},${country}&api_key=668485130ace1696841598qug4b1ed1`
  );
  const LatLonData = await LatLonResponse.json();
  //console.log(LatLonData[0]);

  function fetchError() {
    return new Promise(function (resolve, reject) {
      if (LatLonData.length == 0) {
        reject();
      }
    });
  }
  fetchError().catch(function () {
    setTimeout(() => {
      alert("Invalid city and/or state");
      window.location.reload();
      throw new Error("Invalid city and/or state");
    }, 0);
  });

  let longitude = LatLonData[0].lon;
  let latitude = LatLonData[0].lat;
  let locationName = LatLonData[0].display_name;
  //let stateName = LatLonData[0].state;
  const location = new Location(locationName);
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
  const dayNightContainers = Array.from(
    document.getElementsByClassName("childContainer")
  );
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
  const divContainers = Array.from(
    document.getElementsByClassName("container")
  );
  const hourlyForecastContainers = new SubDivContainers(
    divContainers,
    hourlyForecastSlots
  );

  hourlyForecastContainers.createHourlyForecast();
  const hourlyContainers = Array.from(
    document.getElementsByClassName("hourlySlot")
  );
  //console.log(forecastInfoHourly);
  insertInfo(forecastInfoHourly, hourlyContainers);

  divToggle();
  //app.appendChild(footer);
};
initialLoad(city, state);

const insertInfo = (forecastType, containers) => {
  containers.forEach((containerEl, index) => {
    //get dayname

    let forecastDayName = "";
    let startTime = "";
    let time = "";
    if (forecastType.length <= 14) {
      forecastDayName = forecastType[index].name;
    } else {
      startTime = forecastType[index].startTime;
      //2024-07-09T04:00:00-05:00
      time = Number(startTime.split("T")[1].slice(0, 2));
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

const divToggle = () => {
  const containers = document.getElementsByClassName("clickable");
  for (const each of containers) {
    each.addEventListener("click", function (event) {
      event.preventDefault();
      if (this.nextElementSibling.style.display === "none") {
        this.nextElementSibling.style.display = "flex";
      } else {
        this.nextElementSibling.style.display = "none";
      }
    });
  }
};
