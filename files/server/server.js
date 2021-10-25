const express = require('express');
const app = express();


//register ejs view engine
app.set('view engine', 'ejs');

//dotenv config
require('dotenv').config();
const PORT = process.env.PORT || 8000;

//database 
require('./DB/database')

//body-parser deprecated
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.render('login');
});

//listner
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})

