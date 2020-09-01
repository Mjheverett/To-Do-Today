'use strict'

let currentCity = '';
let categorySelections = [];
let apiDate = '';
const atlantaButton = document.getElementById('atlantaButton');
const houstonButton = document.getElementById('houstonButton');
const seattleButton = document.getElementById('seattleButton');
const tampaButton = document.getElementById('tampaButton');

// log when DOM is loaded and hide the results element
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    document.getElementById('weatherHeader').style.display = "none";

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

            });
        });
    }

    //generate categorySelections variable to pass into getEvents if no buttons clicked
    categorySelection();

    // Display's Current Date 
    function displayDate() {
        const currentDay = new Date();
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let day = days[currentDay.getDay()];
        const currentDate = new Date();
            let year = currentDate.getFullYear();
            let date = currentDate.getDate();
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let month = months[currentDate.getMonth()];
        
          // Use for Month inAPI
        let thisMonth = currentDate.getMonth() + 1;
        
        if (date<10){
            date = "0" + date;
        }
        if (thisMonth<10){
            thisMonth = "0" + thisMonth;
        }
        //Date API url https://api.ipgeolocation.io/timezone?apiKey=9326dc3140ac4b1794c68f9aa51ebdd8&tz=America/Los_Angeles
        const dateToday = document.getElementById('date');
        dateToday.innerHTML = (day +" "+ month +" "+ date +", "+ year);

        // Use for Date and Year in API
        apiDate = String(year + '-' + thisMonth + '-' + date);
        // console.log("apiDate:", apiDate);
        return apiDate;
    };
    displayDate();
    // console.log("apiDate in DOM events", apiDate);

    (function() {
        document.trigger("enhance");
    })

    // Modal popup for Coronavirus Warning
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

});

// ********** ********** City Button Event Listeners ********** **********

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
    getEventsData(currentCity, apiDate);
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
    getEventsData(currentCity, apiDate);
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
    getEventsData(currentCity, apiDate);
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
    getEventsData(currentCity, apiDate);
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

// ********** ********** Get Events Data ********** **********

// Main function performs all calls to apis while managing refresh via Promise.all
const getEventsData = (currentCity, apiDate) => {
    const concerts = getConcerts(currentCity, apiDate);
    const sports = getSports(currentCity, apiDate);
    const expos = getExpos(currentCity, apiDate);
    const community = getCommunity(currentCity, apiDate);
    const festivals = getFestivals(currentCity, apiDate);
    const performing = getPerformingArts(currentCity, apiDate);
    const breweries = getBreweries(currentCity);
    const ticketMaster = getTM(currentCity, apiDate);
    const zomato = getZomato(currentCity);
    const selectCategories = [breweries, community, concerts, expos, festivals, performing, sports, ticketMaster, zomato];
    if (currentCity != '') {
        Promise.all(selectCategories)
        .then(result => {
            // console.log("promise all results", result)
            const eventsList = result.flat();
            // console.log("flattened events", eventsList);
            if (eventsList.length == 0) {
                eventsList.push("No Events Found for Today");
            };
            updateEventElements(eventsList);
        })
        .catch(err => {
            console.error(err)
        });
    };
};

// child function to update DOM elements created by getEventsData
const updateEventElements = (eventsList) => {
    const shuffledEvents = shuffle(eventsList);
    // console.log("shuffled events", eventsList);
    const eventAncestor = document.getElementById('eventsContainer');
    eventAncestor.innerHTML = '';
    shuffledEvents.map(function(event) {
        const eventParent = document.createElement('div');
        eventParent.classList.add('box');
        const eventWrapper = document.createElement('div');
        eventWrapper.classList.add('content');
        const eventElement = document.createElement('a');
        eventElement.classList.add('heading');
        eventElement.classList.add('event-box');
        eventElement.setAttribute('target','_blank');
        // const eventName = event;
        eventElement.innerText = event[0];
        if (event[1] == '') {
            console.log("event url blank", event);
            let blankURL = String(event[0]);
            blankURL = blankURL.replace(/ /g,'%20');
            eventElement.href = `https://www.google.com/?q=${currentCity}%20${blankURL}`;
        } else {
            eventElement.href = event[1];
        }
        
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

// Craft Beer Data
const getBreweries = (currentCity) => {
    const breweryURL = `https://api.openbrewerydb.org/breweries?by_city=${currentCity}`;
    return get(breweryURL).then(function(breweryData) {
        let breweryList = [];
        let breweryShuffle = [];
        if (categorySelections.includes("breweries")) {
            breweryData.map(function(brewery) {
                const breweryListName = [brewery.name, brewery.website_url];
                breweryShuffle = [...breweryShuffle, breweryListName];
                breweryList = shuffle(breweryShuffle);
                // breweryList = breweryList.slice(0, 5);
                return breweryList;
            })
            // console.log("brewery list array", breweryList);
            return breweryList;
        };
        return breweryList;
    });
};

// Community Data
const getCommunity = (currentCity, apiDate) => {
    const communityURL = `https://api.predicthq.com/v1/events/?category=community&place=${currentCity}&end.lte=${apiDate}&start.gte=${apiDate}`;
    return getPredict(communityURL).then(function(communityData) {
        let communityList = [];
        if (categorySelections.includes("community")) {
            communityData.results.map(function(community) {    
                let communityURL = String(community.title);
                communityURL = communityURL.replace(/ /g,'%20');
                const communityListName = [community.title, `https://www.google.com/?q=${currentCity}%20${communityURL}`];
                communityList = [...communityList, communityListName];
                return communityList;
            })
            return communityList;
        };
        return communityList;
    });
};

// Concert Data
const getConcerts = (currentCity, apiDate) => {
    const concertURL = `https://api.predicthq.com/v1/events/?category=concerts&place=${currentCity}&end.lte=${apiDate}&start.gte=${apiDate}`;
    return getPredict(concertURL).then(function(concertData) {
        let concertList = [];
        if (categorySelections.includes("concerts")) {
            concertData.results.map(function(concert) {    
                let concertURL = String(concert.title);
                concertURL = concertURL.replace(/ /g,'%20');
                const concertListName = [concert.title, `https://www.google.com/?q=${currentCity}%20${concertURL}`];
                concertList = [...concertList, concertListName];
                return concertList;
            })
            // console.log("concert list array", concertList);
            return concertList;
        };
        return concertList;
    });
};

// Expos Data
const getExpos = (currentCity, apiDate) => {
    const expoURL = `https://api.predicthq.com/v1/events/?category=expos&place=${currentCity}&end.lte=${apiDate}&start.gte=${apiDate}`;
    return getPredict(expoURL).then(function(expoData) {
        let expoList = [];
        if (categorySelections.includes("expos")) {
            expoData.results.map(function(expo) {    
                let expoURL = String(expo.title);
                expoURL = expoURL.replace(/ /g,'%20');
                const expoListName = [expo.title, `https://www.google.com/?q=${currentCity}%20${expoURL}`];
                expoList = [...expoList, expoListName]
                return expoList;
            })
            // console.log("expo list array", expoList);
            return expoList;
        };
        return expoList;
    });
};

// Festivals Data
const getFestivals = (currentCity, apiDate) => {
    const festivalURL = `https://api.predicthq.com/v1/events/?category=festivals&place=${currentCity}&end.lte=${apiDate}&start.gte=${apiDate}`;
    return getPredict(festivalURL).then(function(festivalData) {
        let festivalList = [];
        if (categorySelections.includes("festivals")) {
            festivalData.results.map(function(festival) {
                let festivalURL = String(festival.title);
                festivalURL = festivalURL.replace(/ /g,'%20');
                const festivalListName = [festival.title, `https://www.google.com/?q=${currentCity}%20${festivalURL}`];
                festivalList = [...festivalList, festivalListName];
                return festivalList;
            })
            // console.log("festival list array", festivalList)
            return festivalList;
        };
        return festivalList;
    });
};

// Performing-arts
const getPerformingArts = (currentCity, apiDate) => {
    const performingArtsURL = `https://api.predicthq.com/v1/events/?category=performing-arts&place=${currentCity}&end.lte=${apiDate}&start.gte=${apiDate}`;
    return getPredict(performingArtsURL).then(function(performingArtsData) {
        let performingList = [];
        if (categorySelections.includes("performing")) {
            performingArtsData.results.map(function(performingArts) {    
                let performingArtsURL = String(performingArts.title);
                performingArtsURL = performingArtsURL.replace(/ /g,'%20');
                const performingListName = [performingArts.title, `https://www.google.com/?q=${currentCity}%20${performingArtsURL}`];
                performingList = [...performingList, performingListName];
                return performingList;
            })
            return performingList;
        };
        return performingList;
    });
};

// Sports Data
const getSports = (currentCity, apiDate) => {
    const sportURL = `https://api.predicthq.com/v1/events/?category=sports&place=${currentCity}&end.lte=${apiDate}&start.gte=${apiDate}`;
    return getPredict(sportURL).then(function(sportData) {
        let sportList = [];
        if (categorySelections.includes("sports")) {
            sportData.results.map(function(sport) {    
                let sportURL = String(sport.title);
                sportURL = sportURL.replace(/ /g,'%20');
                const sportListName = [sport.title, `https://www.google.com/?q=${currentCity}%20${sportURL}`];
            })
            // console.log("sport list array", sportList);
            return sportList;
        };
        return sportList;
    });
};

// TicketMaster Data
const getTM = (currentCity, apiDate) => {
    const TMURL = `https://app.ticketmaster.com/discovery/v2/events.json?city=${currentCity}&startDateTime=${apiDate}T00:00:01Z&endDateTime=${apiDate}T23:59:59Z&apikey=3jrOvprvSgpAYZf10QxR812G8GH88Bvn`;
    return get(TMURL).then(function(TMData) {
        let TMList = [];
        if ('_embedded' in TMData) {
            TMData._embedded.events.map(function(TM) {    
                const TMListName = [TM.name, TM.url];
                TMList = [...TMList, TMListName];
                return TMList;
            })
        };
        // console.log("ticket master list array", TMList);
        return TMList;
    });
};

// Zomato Data
const getZomato = (currentCity) => {
    const zomatoURL = `https://developers.zomato.com/api/v2.1/search?q=${currentCity}&count=10&sort=rating`;
    return getZom(zomatoURL).then(function(zomatoData) {
        let zomatoList = [];
        if (categorySelections.includes("restaurants")) {
            zomatoData.restaurants.map(function(zomato) {    
                const zomatoListName = [zomato.restaurant.name, zomato.restaurant.menu_url];
                zomatoList = [...zomatoList, zomatoListName];
                return zomatoList;
            })
            // console.log("zomato list array", zomatoList);
            return zomatoList;
        };
        return zomatoList;
    });
};

// ********** ********** Checkbox Event Listener ********** **********

// Monitor checkboxes for clicks to update categorySelection variable and trigger refresh of events data for new selection
document.querySelectorAll('#eventSelect').forEach(item => {
    item.addEventListener('click', () => {
        // console.log("item", item.value);
        categorySelection();
        getEventsData(currentCity, apiDate);
    })
});

const categorySelection = () => {
    categorySelections = [];
    const checkboxes = document.querySelectorAll('#eventSelect');
    checkboxes.forEach(item => {
        if (item.checked == true) {
            categorySelections = [...categorySelections, item.value];
        }
        return categorySelections;
    });
    // console.log("category selections", categorySelections);
    return categorySelections;
}
