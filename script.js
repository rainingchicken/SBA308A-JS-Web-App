// const API_KEY = "2d3f8e77a48455b0dce571edae173fdf";
// const city = "Los Angeles";
// const state = "";
// const country = "US";
// const initialLoad = async () => {
//   const res = await fetch(
//     `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=5&appid=${API_KEY}`
//     //api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0cf2a6a9651b76e68b7aa85cecda79a5
//   );
//   const data = await res.json();
//   //console.log(data);
//   let longitude = data[0].lon;
//   let latitude = data[0].lat;
//   const response = await fetch(
//     `https://api.weather.gov/points/${latitude},${longitude}`
//   );
//   const jsonData = await response.json();
//   //console.log(jsonData);
//   let wfo = jsonData.properties.gridId;
//   let x = jsonData.properties.gridX;
//   let y = jsonData.properties.gridY;
//   let forecast = jsonData.properties.forecast;
//   //console.log(forecast);
//   const r = await fetch(`${forecast}`);
//   const d = await r.json();
//   console.log(d.properties.periods);
//   createForcast(d.properties.periods.length);
// };
// initialLoad();
//createForcast(d.properties.periods.length);
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
const app = document.getElementById("app");
const createForcast = (periodLength) => {
  //2 because data gives night and day forecasts
  for (let daysNum = 0; daysNum < periodLength / 2; daysNum++) {
    const weatherContainer = document.createElement("div");
    const dayContainer = document.createElement("div");
    const nightContainer = document.createElement("div");

    weatherContainer.classList.add("container");
    dayContainer.classList.add("dayContainer");
    nightContainer.classList.add("nightContainer");

    weatherContainer.appendChild(dayContainer);
    weatherContainer.appendChild(nightContainer);
    app.appendChild(weatherContainer);
  }
};

createForcast(14);
