const request = require('request');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const address = process.argv[2];
if (address) {
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            console.log(error);
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(location);
                    console.log(forecastData);
                }
            });
        }
    });
} else {
    console.log('Please provide an address.');
}

