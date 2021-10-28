const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

//dotenv config
require('dotenv').config();
const PORT = process.env.PORT || 8000;

//database 
require('./DB/database')

//body-parser deprecated
app.use(express.json());

//layouts
app.use(expressLayouts);
app.set('layout', './layouts/full-layout');

// to access static files like css, js, images etc..
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));

//register ejs view engine
app.set('view engine', 'ejs');

//routes
app.get('/', (req, res) => {
    res.render('login', { title: 'Home' });
});

//dadhbiard rourte
app.get('/dash', (req, res) => {
    res.render('dashboard', { title: 'Dashboard', layout: './layouts/with-sidebar'});
});

//listner
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})