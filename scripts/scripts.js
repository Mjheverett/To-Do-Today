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
});

// ********** ********** Get Events Data ********** **********

const getEventsData = (currentCity) => {
    getBreweries(currentCity);
    getConcerts(currentCity);
}

// Concert Data
const getConcerts = (currentCity) => {
    $.ajax( {
        url: 'https://api.predicthq.com/v1/events/?category=concerts&active.gte=2020-08-27',
        type: 'GET',
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( "Authorization", "Bearer " + MA_n_yWEgU0Ilwoz6_t6fjyz-xZxGLrB76hXPmFA );
        },
        success: function( concertData ) {
            console.log(concertData);
        }
    });
};

// Sports Data
const getSports = (currentCity) => {
    $.ajax( {
        url: 'https://api.predicthq.com/v1/events/?category=sports&active.gte=2020-08-27',
        type: 'GET',
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( "Authorization", "Bearer " + MA_n_yWEgU0Ilwoz6_t6fjyz-xZxGLrB76hXPmFA );
        },
        success: function( sportsData ) {
            console.log(sportsData);
        }
    });
};

// Expos Data
const getExpos = (currentCity) => {
    $.ajax( {
        url: 'https://api.predicthq.com/v1/events/?category=expos&active.gte=2020-08-27',
        type: 'GET',
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( "Authorization", "Bearer " + MA_n_yWEgU0Ilwoz6_t6fjyz-xZxGLrB76hXPmFA );
        },
        success: function( sportsData ) {
            console.log(sportsData);
        }
    });
};

// Community Data
const getCommunity = (currentCity) => {
    const communityURL = `https://api.predicthq.com/v1/events/?category=community&active.gte=2020-08-27`;
    get(communityURL).then(function(fetchResponse) {
        console.log("Community Events", fetchResponse);
    });
};

// Festivals Data
const getFestivals = (currentCity) => {
    const festivalsURL = `https://api.predicthq.com/v1/events/?category=festivals&active.gte=2020-08-27`;
    get(festivalsURL).then(function(fetchResponse) {
        console.log("Festivals", fetchResponse);
    });
};

// Performing-arts
const getPerformingArts = (currentCity) => {
    const performingArtsURL = `https://api.predicthq.com/v1/events/?category=performing-arts&active.gte=2020-08-27`;
    get(performingArtsURL).then(function(fetchResponse) {
        console.log("Performing-Arts", fetchResponse);
    });
};

// Craft Beer Data
const getBreweries = (currentCity) => {
    const breweryURL = `https://api.openbrewerydb.org/breweries?by_city=${currentCity}`;
    get(breweryURL).then(function(fetchResponse) {
        fetchResponse.map(function(brewery) {
            console.log("brewery name:", brewery.name);
            // DOM object = brewery.name;
        })
    });
};