const dotenv = require('dotenv');
dotenv.config();

// npm: Packages-standard
const express = require('express');
const helmet = require('helmet')
const compression = require('compression')
const path = require('path');

const logger = require('./logger/http.logger');

// App
const app = express();

// Compression
app.use(compression());
app.use(helmet());

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
        if (req.originalUrl == '/' && res.statusCode == 200) {
            return true;
        }
        return res.statusCode < process.env.TELEGRAM_LOGGER_SKIP_STATUS_CODE;
    }
}));

// routes
require('./routes/routes')(app);

// run
app.listen(process.env.PORT || 5000);
console.log(`IsWebsiteUp starting on port ... ${process.env.PORT || 5000}`);