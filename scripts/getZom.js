function getZom(url) {
    //Step 1: fetch the data
    return fetch(url, {
        headers: {
            'user-key': '253d9fc5533cdb6d94d0c541ed22af22'
        }
    })
    //Step 2: run the json() method from the response
        .then(function(response) {
            return response.json();
        })
    //Step 3: Return the data from the response.json() method
        .then(function(data) {
            return data;
        })
}