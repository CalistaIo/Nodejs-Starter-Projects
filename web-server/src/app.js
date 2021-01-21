const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'templates', 'views');
const partialsPath = path.join(__dirname, '..', 'templates', 'partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Calista Io'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "You must provide an address"
        });
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                res.send({error: error});
            } else {
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        res.send({error: error});
                    } else {
                        res.send({
                            location: location,
                            forecastData: forecastData,
                            address: req.query.address
                        });
                    }
                });
            }
        });
    }
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        });
    } else {
        console.log(req.query);
        res.send({
            products: []
        });
    }
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Calista Io'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Calista Io'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        mesg: 'Help article not found.',
        title: '404',
        name: 'Calista Io'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        mesg: 'Page not found.',
        title: '404',
        name: 'Calista Io'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});