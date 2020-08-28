'use strict'

let currentCity = '';
let categorySelections = [];
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

    //generate categorySelections variable to pass into getEvents if no buttons clicked
    categorySelection();
    console.log('category selections', categorySelections);

    // Display's Current Date
    function displayDate(){
        const currentDay = new Date();
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let day = days[currentDay.getDay()];
        const currentDate = new Date();
            let year = currentDate.getFullYear();
            let date = currentDate.getDate();
            let months =      ["January","February","March","April","May","June","July","August","September","October","November","December"];
            let month = months[currentDate.getMonth()];
        
          // Use for Month inAPI
        console.log(currentDate.getMonth());
        
        if (date<10){
            date = "0" + date;
        }
        
        const dateToday = document.getElementById('date');
        dateToday.innerHTML = (day +" "+ month +" "+ date +", "+ year);
        // Use for Date and Year in API
        console.log(date);
        console.log(year);
    }
    displayDate();
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
    // console.log("current city:", currentCity);
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
    // console.log("current city:", currentCity);
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
    // console.log("current city:", currentCity);
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
    // console.log("current city:", currentCity);
    atlantaButton.classList.remove('is-primary');
    houstonButton.classList.remove('is-primary');
    seattleButton.classList.remove('is-primary');
    tampaButton.classList.add('is-primary');
    getWeather(currentCity);
    document.getElementById('weatherHeader').style.display = "block";
    getEventsData(currentCity);
});

// ********** ********** Get Events Data ********** **********

// Main function performs all calls to apis while managing refresh via Promise.all
const getEventsData = (currentCity) => {
    const concerts = getConcerts(currentCity);
    const sports = getSports(currentCity);
    const expos = getExpos(currentCity);
    const community = getCommunity(currentCity);
    const festivals = getFestivals(currentCity);
    const performing = getPerformingArts(currentCity);
    const breweries = getBreweries(currentCity);
    const selectCategories = [breweries, community, concerts, expos, festivals, performing, sports];
    Promise.all(selectCategories)
    .then(result => {
        // console.log("promise all results", result) // 'two'
        const eventsList = result.flat();
        updateEventElements(eventsList);
    });
};

// child function to update DOM elements created by getEventsData
const updateEventElements = (eventsList) => {
    const shuffledEvents = shuffle(eventsList);
    console.log("shuffled events", eventsList);
    const eventAncestor = document.getElementById('eventsContainer');
    eventAncestor.innerHTML = '';
    shuffledEvents.map(function(event) {
        const eventParent = document.createElement('div');
        eventParent.classList.add('box');
        const eventWrapper = document.createElement('div');
        eventWrapper.classList.add('content');
        const eventElement = document.createElement('p');
        eventElement.classList.add('heading');
        const eventName = event;
        eventElement.innerText = eventName;
        
        eventWrapper.appendChild(eventElement);
        eventParent.appendChild(eventWrapper);
        eventAncestor.appendChild(eventParent);
    })
}

// Knuth Shuffle, unbiased shuffle algorithm for arrays
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Concert Data
const getConcerts = (currentCity) => {
    const concertURL = `https://api.predicthq.com/v1/events/?active.gte=2020-08-27&category=concerts&offset=10&place=${currentCity}`;
    return getPredict(concertURL).then(function(concertData) {
        let concertList = [];
        concertData.results.map(function(concert) {    
            const concertListName = concert.title;
            concertList = [...concertList, concertListName];
            return concertList;
        })
        // console.log("concert list array", concertList);
        return concertList;
    });
};

// Sports Data
const getSports = (currentCity) => {
    const sportURL = `https://api.predicthq.com/v1/events/?active.gte=2020-08-27&category=sports&offset=10&place=${currentCity}`;
    return getPredict(sportURL).then(function(sportData) {
        let sportList = [];
        sportData.results.map(function(sport) {    
            const sportListName = sport.title;
            sportList = [...sportList, sportListName];
            return sportList;
        })
        // console.log("sport list array", sportList);
        return sportList;
    });
};

// Expos Data
const getExpos = (currentCity) => {
    const expoURL = `https://api.predicthq.com/v1/events/?active.gte=2020-08-27&category=expos&offset=10&place=${currentCity}`;
    return getPredict(expoURL).then(function(expoData) {
        let expoList = [];
        expoData.results.map(function(expo) {    
            const expoListName = expo.title;
            expoList = [...expoList, expoListName]
            return expoList;
        })
        // console.log("expo list array", expoList);
        return expoList;
    });
};

// Community Data
const getCommunity = (currentCity) => {
    const communityURL = `https://api.predicthq.com/v1/events/?active.gte=2020-08-27&category=community&offset=10&place=${currentCity}`;
    return getPredict(communityURL).then(function(communityData) {
        let communityList = [];
        communityData.results.map(function(community) {    
            const communityListName = community.title;
            communityList = [...communityList, communityListName];
            return communityList;
        })
        return communityList;
    });
};

// Festivals Data
const getFestivals = (currentCity) => {
    const festivalURL = `https://api.predicthq.com/v1/events/?active.gte=2020-08-27&category=festivals&offset=10&place=${currentCity}`;
    return getPredict(festivalURL).then(function(festivalData) {
        let festivalList = [];
        festivalData.results.map(function(festival) {
            const festivalListName = festival.title;
            festivalList = [...festivalList, festivalListName];
            return festivalList;
        })
        // console.log("festival list array", festivalList)
        return festivalList;
    });
};

// Performing-arts
const getPerformingArts = (currentCity) => {
    const performingArtsURL = `https://api.predicthq.com/v1/events/?active.gte=2020-08-27&category=performing-arts&offset=10&place=${currentCity}`;
    return getPredict(performingArtsURL).then(function(performingArtsData) {
        let performingList = [];
        performingArtsData.results.map(function(performingArts) {    
            const performingListName = performingArts.title;
            performingList = [...performingList, performingListName];
            return performingList;
        })
        return performingList;
    });
};

// Craft Beer Data
const getBreweries = (currentCity) => {
    const breweryURL = `https://api.openbrewerydb.org/breweries?by_city=${currentCity}`;
    return get(breweryURL).then(function(breweryData) {
        let breweryList = [];
        breweryData.map(function(brewery) {
            const breweryListName = brewery.name;
            breweryList = [...breweryList, breweryListName];
            return breweryList;
        })
        // console.log("brewery list array", breweryList);
        return breweryList
    });
};

//check boxes
document.querySelectorAll('#eventSelect').forEach(item => {
    item.addEventListener('click', () => {
        console.log("item", item.value);
        categorySelection();
    })
});

const categorySelection = () => {
    categorySelections = [];
    let categoryStrings = [];
    const checkboxes = document.querySelectorAll('#eventSelect');
    checkboxes.forEach(item => {
        // console.log(item);
        if (item.checked == true) {
            categoryStrings = [...categoryStrings, item.value];
        }
        return categoryStrings;
    });
    console.log("category strings", categoryStrings);
    categoryStrings.forEach((value) => {
        switch(value) {
            case "breweries":
                categorySelections = [...categorySelections, breweries];
                break;
            case "community":
                categorySelections = [...categorySelections, community];
                break;
            case "concerts":
                categorySelections = [...categorySelections, concerts];
                break;
            case "expos":
                categorySelections = [...categorySelections, expos];
                break;
            case "festivals":
                categorySelections = [...categorySelections, festivals];
                break;
            case "performing":
                categorySelections = [...categorySelections, performing];
                break;
            case "sports":
                categorySelections = [...categorySelections, sports];
                break;
        }
    });
    return categorySelections;
}

// function defined variables to pass into getEventsData are not defined when call in switch statement. Fix hoisting issue.