'use strict'

let currentCity = '';
const atlantaButton = document.getElementById('atlantaButton');
const houstonButton = document.getElementById('houstonButton');

//These two lines hide and un-hide the dashboard event block: 
// document.getElementById('eventsColumns').style.display = "block";

// log when DOM is loaded and hide the results element
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    document.getElementById('weatherHeader').style.display = "none";
    // document.getElementById('eventsColumns').style.display = "none";
});

// Get weather data for selected city
const getWeather = (currentCity) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=c0ae55bcbeaae633fae083cbaa9bdbfb&units=imperial`;
    get(url).then(function(fetchResponse) {
        const weatherTemp = document.getElementById('weatherTemp');
        weatherTemp.innerHTML = `Temperature: ${fetchResponse.main.temp} F`;
        const weatherFeelsLikeTemp = document.getElementById('weatherFeelsLikeTemp');
        weatherFeelsLikeTemp.innerHTML = `Feels Like: ${fetchResponse.main.feels_like} F`;
        const weatherHumid = document.getElementById('weatherHumid');
        weatherHumid.innerHTML = `Humidity: ${fetchResponse.main.humidity} %`;
        const weatherWind = document.getElementById('weatherWind');
        weatherWind.innerHTML = `Wind Speed: ${fetchResponse.wind.speed} mph`;
    });
}

// Selector for current city
atlantaButton.addEventListener('click', () => {
    currentCity = "Atlanta";
    console.log("current city:", currentCity);
    houstonButton.classList.remove('is-primary');
    atlantaButton.classList.add('is-primary');
    getWeather(currentCity);
    document.getElementById('weatherHeader').style.display = "block";
});

houstonButton.addEventListener('click', () => {
    currentCity = "Houston";
    console.log("current city:", currentCity);
    atlantaButton.classList.remove('is-primary');
    houstonButton.classList.add('is-primary');
    getWeather(currentCity);
    document.getElementById('weatherHeader').style.display = "block";
});

// ********** ********** Get Events Data ********** **********

// Concert Data



// Sports Data



// Craft Beer Data

