# SBA208A JavaScript Web Application

## Purpose

This is another Skill Based Assessment project for Per Scholas. This project is all about using APIs. I developed a weather app where user can input a city and state in the U.S. to check the weather of that area. User will be greeted by the day and night forecasts for the week. If the user click on a day for hourly forecasts for that day.

## Objectives

- Use asynchronous JavaScript tools to build a responsive web application.
- Demonstrate understanding of the JavaScript event loop.
- Generate asynchronous code using Promises and async/await syntax.
- Use fetch and/or Axios to interact with an external web API.
- Organize files using modules and imports.

## Requirements

- Use the fetch API or Axios to communicate with an external web API. Use the data provided by this API to populate your application’s content and features.
  - fetched 2 different APIs and multiple urls
    - fetched api.openweathermap.org for lat and lon
    - fetched api.weather.gov for location names, bidaily forecasts, hourly forecasts, etc
- Create user interaction with the API through a search feature, paginated gallery, or similar. This feature should use GET requests to retrieve associated data.
  - user inputs city and state and app will get forecasts for that area
- Make use of Promises and async/await syntax as appropriate.
  - `return new Promise(function (resolve, reject) { if (LatLonData.length == 0) { reject(); } });`
  - async and lots of awaits

```js
const initialLoad = async (city, state) => {
//fetch latitude and longitude
const LatLonResponse = await fetch(
   `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=5&appid=${API_KEY}`
 );
 ...
 ...
 ...
}
```

- Organize your JavaScript code into at least three (3) different module files, and import functions and data across files as necessary.
  - `import { Input } from "./Input.js";`
  - `import { Forecast } from "./Forecast.js";`
  - `import { DivContainers } from "./DivContainers.js";`
  - `import { SubDivContainers } from "./subDivContainers.js";`
  - `import { Location } from "./Location.js";`
- Ensure the program runs as expected, without any undesired behavior caused by misunderstanding of the JavaScript event loop (such as race conditions, API calls being handled out of order, etc.).
  - `throw new Error("Invalid city and/or state");`
- Create an engaging user experience through the use of HTML and CSS.
  - yes I love the color scheme and everything is nice and simple
- Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).
  - everything works! rip 10 hours

## Sources

- https://fonts.google.com/specimen/Quicksand
- https://www.schemecolor.com/another-curiosity.php
- https://www.weather.gov/documentation/services-web-api#/default/alerts_query
- https://openweathermap.org/api
