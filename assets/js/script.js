var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city")

// request a weather from the URL
var getCity = function(city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4d7dc3e3b9de372c87b2cd21104c5026";
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

// get value from input 
var citySubmitHandler = function(event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();
    if (cityName) {
        getCity(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city name.")
    }
}


// var displayWeather = function() {
// }


searchFormEl.addEventListener("submit", citySubmitHandler);






