function get(url) {
    //Step 1: fetch the data
    return fetch(url)
    //Step 2: run the json() method from the response
        .then(function(response) {
            return response.json();
        })
    //Step 3: Return the data from the response.json() method
        .then(function(data) {
            return data;
        })
}