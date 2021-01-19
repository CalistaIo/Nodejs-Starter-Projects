const http = require('http');
const url = 'http://api.weatherstack.com/current?access_key=86c9a0f78f4bbb4e59f7a31acbc0f6a9&query=45,-75&units=f';

const request = http.request(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk.toString();
    });

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });

    response.on('error', (error) => {
        console.log(error);
    })
});

request.end();