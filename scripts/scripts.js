'use strict'

let currentCity = '';
const atlantaButton = document.getElementById('atlantaButton');
const houstonButton = document.getElementById('houstonButton');
const seattleButton = document.getElementById('seattleButton');
const tampaButton = document.getElementById('tampaButton');

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
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=c0ae55bcbeaae633fae083cbaa9bdbfb&units=imperial`;
    get(weatherURL).then(function(fetchResponse) {
        const weatherTitle = document.getElementById('weatherTitle');
        weatherTitle.innerHTML = `${currentCity} Weather`;
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
    seattleButton.classList.remove('is-primary');
    tampaButton.classList.remove('is-primary');
    atlantaButton.classList.add('is-primary');
    getWeather(currentCity);
    document.getElementById('weatherHeader').style.display = "block";
    getEventsData(currentCity);
});

houstonButton.addEventListener('click', () => {
    currentCity = "Houston";
    console.log("current city:", currentCity);
    atlantaButton.classList.remove('is-primary');
    seattleButton.classList.remove('is-primary');
    tampaButton.classList.remove('is-primary');
    houstonButton.classList.add('is-primary');
    getWeather(currentCity);
    document.getElementById('weatherHeader').style.display = "block";
    getEventsData(currentCity);
});

seattleButton.addEventListener('click', () => {
    currentCity = "Seattle";
    console.log("current city:", currentCity);
    atlantaButton.classList.remove('is-primary');
    houstonButton.classList.remove('is-primary');
    tampaButton.classList.remove('is-primary');
    seattleButton.classList.add('is-primary');
    getWeather(currentCity);
    document.getElementById('weatherHeader').style.display = "block";
    getEventsData(currentCity);
});

tampaButton.addEventListener('click', () => {
    currentCity = "Tampa";
    console.log("current city:", currentCity);
    atlantaButton.classList.remove('is-primary');
    houstonButton.classList.remove('is-primary');
    seattleButton.classList.remove('is-primary');
    tampaButton.classList.add('is-primary');
    getWeather(currentCity);
    document.getElementById('weatherHeader').style.display = "block";
    getEventsData(currentCity);
});

// ********** ********** Get Events Data ********** **********

const getEventsData = (currentCity) => {
    getBreweries(currentCity);
    getConcerts(currentCity);
    getSports(currentCity);
    getFestivals(currentCity);
};

// Concert Data
const getConcerts = (currentCity) => {
    const concertURL = `https://api.predicthq.com/v1/events/?active.gte=2020-08-27&category=concerts&offset=10&place=${currentCity}`;
    document.getElementById('concertsList').innerHTML = '';
    getPredict(concertURL).then(function(concertData) {
        concertData.results.map(function(concert) {    
            const concertList = document.getElementById('concertsList');
            const concertListName = document.createElement('li');
            concertListName.innerText = concert.title;
            concertList.appendChild(concertListName);
        })
    });
};

// Sports Data
const getSports = (currentCity) => {
    const sportURL = `https://api.predicthq.com/v1/events/?active.gte=2020-08-27&category=sports&offset=10&place=${currentCity}`;
    document.getElementById('sportsList').innerHTML = '';
    getPredict(sportURL).then(function(sportData) {
        sportData.results.map(function(sport) {    
            const sportList = document.getElementById('sportsList');
            const sportListName = document.createElement('li');
            sportListName.innerText = sport.title;
            sportList.appendChild(sportListName);
        })
    });
};

// Expos Data


// Community Data


// Festivals Data
const getFestivals = (currentCity) => {
    const festivalURL = `https://api.predicthq.com/v1/events/?active.gte=2020-08-27&category=festivals&offset=10&place=${currentCity}`;
    document.getElementById('festivalsList').innerHTML = '';
    getPredict(festivalURL).then(function(festivalData) {
        if (festivalData.results != '') {
            const festivalList = festivalData.results;
            festivalList.map(function(festival) {
                const festivalList = document.getElementById('festivalsList');
                const festivalListName = document.createElement('li');
                festivalListName.innerText = festival.title;
                festivalList.appendChild(festivalListName);
            })
        } else {
            const festivalList = document.getElementById('festivalsList');
            const festivalListName = document.createElement('p');
            festivalListName.innerText = "No Festivals Scheduled";
            festivalList.appendChild(festivalListName);
        }
    })
};

// Performing-arts


// Craft Beer Data
const getBreweries = (currentCity) => {
    const breweryURL = `https://api.openbrewerydb.org/breweries?by_city=${currentCity}`;
    document.getElementById('breweriesList').innerHTML = '';
    get(breweryURL).then(function(fetchResponse) {
        fetchResponse.map(function(brewery) {
            const breweryList = document.getElementById('breweriesList')
            const breweryListName = document.createElement('li');
            breweryListName.innerText = brewery.name;
            breweryList.appendChild(breweryListName);
        })
    });
};