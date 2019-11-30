const dotenv = require('dotenv');
dotenv.config();

// npm: Packages-standard
const express = require('express');
const path = require('path');

// App
const app = express();

function MakeServer() {
    // Setting static files
    app.use(express.static(path.join(__dirname, './../src/public')));

    // Parser for body request
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));

    // Setting views and template engine
    app.set('views', path.join(__dirname, './../src/views/'));
    app.set('view engine', 'ejs');

    // routes
    require('./../src/routes/routes')(app);

    // run
    const server = app.listen(process.env.PORT);

    return server;
}

module.exports = MakeServer;