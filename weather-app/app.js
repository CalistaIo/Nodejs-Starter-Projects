const request = require('request');

const url = 'http://api.weatherstack.com/current?access_key=86c9a0f78f4bbb4e59f7a31acbc0f6a9&query=37.8267,-122.4233&units=f';

// request({
//     url: url,
//     json: true
// }, (error, response) => {
//     if (response === undefined) {
//         console.log('Unable to connect to weather service!');
//     } else if (response.body.error) {
//         console.log('Unable to find location!');
//     } else {
//         const data = response.body;
//         const currentData = data.current;
//         console.log(currentData.weather_descriptions[0] + '. It is currently ' + currentData.temperature + ' fahrenheit out. It feels like ' + currentData.feelslike + ' fahrenheit out.');
//     }
// });

// Geocoding
// Address -> Lat/Long -> Weather
const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiY2h1cmFuIiwiYSI6ImNranU2b3VjczBjYWszMnBsc3E2d3M3aTgifQ.JEHqYpJqcIQpvasd144d7w&limit=1';

request({
    url: geocodeUrl,
    json: true
}, (error, response) => {
    if (error) {
        console.log('Unable to connect to location service!');
    } else if (response.body.features.length == 0) {
        console.log('Unable to find location. Try another search.');
    } else {
        const data = response.body.features[0].center;
        const latitude = data[1];
        const longitude = data[0];
        console.log('Latitude is ' + latitude);
        console.log('Longitude is ' + longitude);
    }
});