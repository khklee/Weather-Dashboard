var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city")

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
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=4d7dc3e3b9de372c87b2cd21104c5026";
    fetch(apiURL)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data)
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
        cityInputEl.value = "";
    } else {
        alert("Please enter a city name.")
    }
}



// var displayWeather = function() {
// }


searchFormEl.addEventListener("submit", citySubmitHandler);





