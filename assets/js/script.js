var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city")
var weatherEl = document.querySelector("#weather-container")
var forecastEl = document.querySelector("#forecast-container");
var forecastCardEl = document.querySelector("#card");
var historyEl = document.querySelector("#history");
var today = new Date();

// request geographical coordinates (lat, lon)
var getLatLon = function(city) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+ city + "&limit=1&appid=4d7dc3e3b9de372c87b2cd21104c5026";
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data)

                    // get lat & lon from a city name
                    var cityLat = data[0].lat;
                    var cityLon = data[0].lon;
                    // get city's weather
                    getCity(cityLat, cityLon);
                })
            }
        })
};

// request a weather from the URL
var getCity = function(lat, lon) {
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=4d7dc3e3b9de372c87b2cd21104c5026";
    fetch(apiURL)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data)
                    
                    // display current weather
                    displayWeather(data);

                    // display 5-day forecast
                    displayForecast(data);

                    // create a search history
                    searchHistory();

                    // clear the search field
                    cityInputEl.value = "";
                })
            } else {
                alert("City Name Not Found!");
            }
        })
}

// get values from city input 
var citySubmitHandler = function(event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getLatLon(cityName);
    } else {
        alert("Please enter a city name.")
    }
}

// display current weather of a city
var displayWeather = function(data) {
    // clear old data
    weatherEl.textContent = "";

    // creat current weather container
    var curWeather = document.createElement("div");
    var cityDate = document.createElement("h3");
    var weatherImg = document.createElement("img");
    var temp = document.createElement("p");
    var wind = document.createElement("p");
    var humidity = document.createElement("p");
    var uv = document.createElement("p");
    var uvIndex = document.createElement("span");

    curWeather.classList = "current-weather";
    cityDate.classList = "city";

    // UV conditions indicator
    if (data.current.uvi < 3) {
        uvIndex.classList = "favorable";
    } else if (data.current.uvi < 8) {
        uvIndex.classList = "moderate";
    } else {
        uvIndex.classList = "severe";
    };

    weatherImg.setAttribute("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png")

    cityDate.textContent = city.value + " (" + (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear() + ")";
    temp.textContent = "Temp: " + data.current.temp + "°F";
    wind.textContent = "Wind: " + data.current.wind_speed + " MPH";
    humidity.textContent = "Humidity: " + data.current.humidity + "%";
    uv.textContent = "UV Index: "
    uvIndex.textContent = data.current.uvi

    weatherEl.appendChild(curWeather);
    curWeather.appendChild(cityDate);
    cityDate.appendChild(weatherImg);
    curWeather.append(temp, wind, humidity, uv);
    uv.appendChild(uvIndex);
}

// display 5-day forecast
var displayForecast = function(data) {
    // clear old data
    forecastEl.textContent = "";

    // create card title
    var forecastTitle = document.createElement("h3");
    forecastTitle.textContent = "5-Day Forecast:";
    forecastEl.appendChild(forecastTitle);
 
    // create cards for 5 days forecast
    for (var i = 0; i < 5; i++) {
        var dayCard = document.createElement("div");
        var forecastDate = document.createElement("h4");
        var forecastIcon = document.createElement("img");
        var forecastTemp = document.createElement("p");
        var forecastWind = document.createElement("p");
        var forecastHumidity = document.createElement("p");

        dayCard.classList = "card col-2";

        forecastDate.textContent = (today.getMonth()+1) + "/" + (today.getDate()+i+1) + "/" + today.getFullYear();
        forecastIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png");
        forecastTemp.textContent = "Temp: " + data.daily[i].temp.day + "°F";
        forecastWind.textContent = "Wind: " + data.daily[i].wind_speed + "MPH";
        forecastHumidity.textContent = "Humidity: " + data.daily[i].humidity + "%";
        
        forecastEl.appendChild(dayCard);
        dayCard.append(forecastDate, forecastIcon, forecastTemp, forecastWind, forecastHumidity);
    }
}

var searchHistory = function() {
    // create button for a city
    var searchCity = document.createElement("btn");
    var cityName = cityInputEl.value.trim();

    historyEl.classList = "search-history"
    searchCity.setAttribute("type", "submit")
    searchCity.classList = "btn search-btn city";
    searchCity.textContent = cityName;

    historyEl.appendChild(searchCity);

}

searchFormEl.addEventListener("submit", citySubmitHandler);





