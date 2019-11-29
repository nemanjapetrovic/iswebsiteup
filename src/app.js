if (process.env.ENV !== 'production') {
    var dotenv = require('dotenv');
    dotenv.config();
}

// npm: Packages-standard
const express = require('express');

// npm: Packages-middlewares
const path = require('path');

const logger = require('./logger/http.logger');

// App
const app = express();

// Setting static files
app.use(express.static(path.join(__dirname, './public')));

// Parser for body request
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Setting views and template engine
app.set('views', path.join(__dirname, './views/'));
app.set('view engine', 'ejs');

// initializing the logger
app.use(logger('tiny', {
    skip: function (req, res) {
        return res.statusCode < 400;
    }
}));

// routes
require('./routes/routes')(app);

// run
app.listen(process.env.PORT);
console.log('works ... ' + process.env.PORT);