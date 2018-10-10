const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().getFullYear();
    var log = `${now} ${req.method} ${req.url}`;
    fs.appendFileSync('server.log', log + '\n');
    next();
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>  {
    return text.toUpperCase();
});
app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!<h1>');
    // res.send({
    //     name: 'Gurpreet singh',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fetch request'
    });
});

app.listen(3000, () => {
    console.log('App is listening on 3000 port number');
}) ;