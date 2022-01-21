var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city")
var weatherEl = document.querySelector("#weather-container")
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
    if (0 <= uvIndex < 3) {
        uvIndex.classList = "favorable";
    } else if (3 < uvIndex < 8) {
        uvIndex.classList = "moderate";
    } else {
        uvIndex.classList = "severe";
    };
    
    weatherImg.setAttribute("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png")

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

searchFormEl.addEventListener("submit", citySubmitHandler);





