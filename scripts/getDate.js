/* const dateUrl = `https://api.ipgeolocation.io/timezone?apiKey=9326dc3140ac4b1794c68f9aa51ebdd8&tz=America/Los_Angeles`
function getDate(dateURL) {
    //Step 1: fetch the data
    return fetch(dateURL)
    //Step 2: run the json() method from the response
        .then(function(response) {
            return response.json();
        })
    //Step 3: Return the data from the response.json() method
        .then(function(data) {
            return data;
        })
} */