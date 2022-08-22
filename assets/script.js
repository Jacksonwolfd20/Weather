//Grabs the Starter buttons
var austinbtn = document.querySelector("#common-austin");
var chicagobtn = document.querySelector("#common-chicago");
var newyorkbtn = document.querySelector("#common-newyork");
var orlandobtn = document.querySelector("#common-orlando");
var sanfransicobtn = document.querySelector("#common-sanfrancisco");
var seattlebtn = document.querySelector("#common-seattle");
var denverbtn = document.querySelector("#common-denver");
var atlantabtn = document.querySelector("#common-atlanta");
//Grabs Current
var currentCity = document.querySelector("#current-city");
var currentTemp = document.querySelector("#current-temp");
var currentWind = document.querySelector("#current-wind");
var currentHumidity = document.querySelector("#current-humidity");
var currentUv = document.querySelector("#current-uv");
var currenttime = document.querySelector("#current-time")
//Grabs Day 1
var day1temp = document.querySelector("#day1-temp");
var day1wind = document.querySelector("#day1-wind");
var day1humidity = document.querySelector("#day1-humidity");
var day1time = document.querySelector("#time1");
//Grabs Day 2
var day2temp = document.querySelector("#day2-temp");
var day2wind = document.querySelector("#day2-wind");
var day2humidity = document.querySelector("#day2-humidity");
var day2time = document.querySelector("#time2");
//Grabs Day 3
var day3temp = document.querySelector("#day3-temp");
var day3wind = document.querySelector("#day3-wind");
var day3humidity = document.querySelector("#day3-humidity");
var day3time = document.querySelector("#time3");
//Grabs Day 4
var day4temp = document.querySelector("#day4-temp");
var day4wind = document.querySelector("#day4-wind");
var day4humidity = document.querySelector("#day4-humidity");
var day4time = document.querySelector("#time4");
//Grabs Day 5
var day5temp = document.querySelector("#day5-temp");
var day5wind = document.querySelector("#day5-wind");
var day5humidity = document.querySelector("#day5-humidity");
var day5time = document.querySelector("#time5");
//Lets me store lat and lon
var lat = 0;
var lon = 0;

var cityArray = [];
//Sets apikey
var apiKey = "2bf6b66810e81d2eaafabb9505c4eb18";


function saveCity(cityName) {
  // Only store the city if it hasn't been previously stored
  if (!cityArray ||
      cityArray.length === 0 ||
      !cityArray.includes(cityName)) {
    cityArray.push(cityName);
    // Sort the previously searched cities so they are alphabetical
    cityArray.sort();
    // Store to local storage
    localStorage.removeItem("previousSearch");
    localStorage.setItem("previousSearch", JSON.stringify(cityArray));
  }
  return;
}

function getCityWeather(cityName) {
  var WeatherUrlApi = encodeURI(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=${apiKey}`);
  fetch(WeatherUrlApi, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Sets up the Current Weather
      buildCurrentWeather(cityName, data);
      // Build the Forecast Section
      buildForecast(data);
    });
  return;
}

function buildCurrentWeather(cityName, data) {
  // Clear out current weather for search city
  $("#currentWeather").empty();
  var today = moment().format('L');

  // Current day
  currentCity.textContent = (": " + cityName);

  // Current icon
  var currentIcon = buildWeatherIcon(data.current.weather[0].icon);

  // Current temp
  currentTemp.textContent = (" " + data.current.temp + "F");
  // Current UV
  currentUv.textContent = (" " + data.current.uvi);
  // Current Humidity
  currentHumidity.textContent = (" " + data.current.humidity + " %");
  // Current Wind Speed
  currentWind.textContent = (" " + data.current.wind_speed + " MPH");

  return;
}

function buildForecast(data) {

  // Day 1 temp
  day1temp.textContent = (" " + data.daily[2].temp.max + "F");
  // Day 1 Humidity
  day1humidity.textContent = (" " + data.daily[2].humidity + " %");
  // Day 1 Wind Speed
  day1wind.textContent = (" " + data.daily[2].wind_speed + " MPH");
  // Day 1 Time
  //day1time.textContent = ();

  // Day 2 temp
  day2temp.textContent = (" " + data.daily[3].temp.max + "F");
  // Day 2 Humidity
  day2humidity.textContent = (" " + data.daily[3].humidity + " %");
  // Day 2 Wind Speed
  day2wind.textContent = (" " + data.daily[3].wind_speed + " MPH");
  // Day 2 Time
  //day2time.textContent = ();

  // Day 3 temp
  day3temp.textContent = (" " + data.daily[4].temp.max + "F");
  // Day 3 Humidity
  day3humidity.textContent = (" " + data.daily[4].humidity + " %");
  // Day 3 Wind Speed
  day3wind.textContent = (" " + data.daily[4].wind_speed + " MPH");
  // Day 3 Time
  //day3time.textContent = ();

  // Day 4 temp
  day4temp.textContent = (" " + data.daily[5].temp.max + "F");
  // Day 4 Humidity
  day4humidity.textContent = (" " + data.daily[5].humidity + " %");
  // Day 4 Wind Speed
  day4wind.textContent = (" " + data.daily[5].wind_speed + " MPH");
  // Day 4 Time
  //day4time.textContent = ();

  // Day 5 temp
  day5temp.textContent = (" " + data.daily[6].temp.max + "F");
  // Day 5 Humidity
  day5humidity.textContent = (" " + data.daily[6].humidity + " %");
  // Day 5 Wind Speed
  day5wind.textContent = (" " + data.daily[6].wind_speed + " MPH");
  // Day 5 Time
  //day5time.textContent = ();

  
  return;
}

austinbtn.addEventListener("click" , function (){
  event.preventDefault();

  var cityName = ("Austin")

  var cityUrl = encodeURI(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=e21117d4bbcf0007c4027b6d47ffa12b`);

  fetch(cityUrl, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    cache: 'reload'  // Refresh the cache
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      lat = data[0].lat;
      lon = data[0].lon;
      // Save search city to local storage
      saveCity(cityName);
      // Get the weather for this city
      getCityWeather(cityName);
    })
    .catch(error => {
      alert('City entered is not valid.');
    });
  return;
})

chicagobtn.addEventListener("click" , function (){
  event.preventDefault();

  var cityName = ("Chicago")

  var cityUrl = encodeURI(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=e21117d4bbcf0007c4027b6d47ffa12b`);

  fetch(cityUrl, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    cache: 'reload'  // Refresh the cache
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      lat = data[0].lat;
      lon = data[0].lon;
      // Save search city to local storage
      saveCity(cityName);
      // Get the weather for this city
      getCityWeather(cityName);
    })
    .catch(error => {
      alert('City entered is not valid.');
    });
  return;
})

newyorkbtn.addEventListener("click" , function (){
  event.preventDefault();

  var cityName = ("New York")

  var cityUrl = encodeURI(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=e21117d4bbcf0007c4027b6d47ffa12b`);

  fetch(cityUrl, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    cache: 'reload'  // Refresh the cache
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      lat = data[0].lat;
      lon = data[0].lon;
      // Save search city to local storage
      saveCity(cityName);
      // Get the weather for this city
      getCityWeather(cityName);
    })
    .catch(error => {
      alert('City entered is not valid.');
    });
  return;
})

orlandobtn.addEventListener("click" , function (){
  event.preventDefault();

  var cityName = ("Orlando")

  var cityUrl = encodeURI(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=e21117d4bbcf0007c4027b6d47ffa12b`);

  fetch(cityUrl, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    cache: 'reload'  // Refresh the cache
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      lat = data[0].lat;
      lon = data[0].lon;
      // Save search city to local storage
      saveCity(cityName);
      // Get the weather for this city
      getCityWeather(cityName);
    })
    .catch(error => {
      alert('City entered is not valid.');
    });
  return;
})

sanfransicobtn.addEventListener("click" , function (){
  event.preventDefault();

  var cityName = ("San Fransico")

  var cityUrl = encodeURI(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=e21117d4bbcf0007c4027b6d47ffa12b`);

  fetch(cityUrl, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    cache: 'reload'  // Refresh the cache
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      lat = data[0].lat;
      lon = data[0].lon;
      // Save search city to local storage
      saveCity(cityName);
      // Get the weather for this city
      getCityWeather(cityName);
    })
    .catch(error => {
      alert('City entered is not valid.');
    });
  return;
})

seattlebtn.addEventListener("click" , function (){
  event.preventDefault();

  var cityName = ("Seattle")

  var cityUrl = encodeURI(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=e21117d4bbcf0007c4027b6d47ffa12b`);

  fetch(cityUrl, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    cache: 'reload'  // Refresh the cache
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      lat = data[0].lat;
      lon = data[0].lon;
      // Save search city to local storage
      saveCity(cityName);
      // Get the weather for this city
      getCityWeather(cityName);
    })
    .catch(error => {
      alert('City entered is not valid.');
    });
  return;
})

denverbtn.addEventListener("click" , function (){
  event.preventDefault();

  var cityName = ("Denver")

  var cityUrl = encodeURI(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=e21117d4bbcf0007c4027b6d47ffa12b`);

  fetch(cityUrl, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    cache: 'reload'  // Refresh the cache
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      lat = data[0].lat;
      lon = data[0].lon;
      // Save search city to local storage
      saveCity(cityName);
      // Get the weather for this city
      getCityWeather(cityName);
    })
    .catch(error => {
      alert('City entered is not valid.');
    });
  return;
})

atlantabtn.addEventListener("click" , function (){
  event.preventDefault();

  var cityName = ("Atlanta")

  var cityUrl = encodeURI(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=e21117d4bbcf0007c4027b6d47ffa12b`);

  fetch(cityUrl, {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    cache: 'reload'  // Refresh the cache
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      lat = data[0].lat;
      lon = data[0].lon;
      // Save search city to local storage
      saveCity(cityName);
      // Get the weather for this city
      getCityWeather(cityName);
    })
    .catch(error => {
      alert('City entered is not valid.');
    });
  return;
})

function buildWeatherIcon(iconName) {
  return `http://openweathermap.org/img/wn/${iconName}.png`;
}

