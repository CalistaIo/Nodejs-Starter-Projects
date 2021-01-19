const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=86c9a0f78f4bbb4e59f7a31acbc0f6a9&query=' + latitude + ',' + longitude + '&units=f';

    request({
    url,
    json: true
    }, (error, {body}) => {
    if (error) {
        callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
        callback('Unable to find location!', undefined);
    } else {
        const {weather_descriptions, temperature, feelslike} = body.current;
        const forecastString = weather_descriptions[0] + '. It is currently ' + temperature + ' fahrenheit out. It feels like ' + feelslike + ' fahrenheit out.';
        callback(undefined, forecastString);
    }
    });
}

module.exports = forecast