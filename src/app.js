if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

// npm: Packages-standard
const express = require('express');
const helmet = require('helmet');
const path = require('path');

// App
const app = express();

// Helmet
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

// routes
require('./routes/routes')(app);

// run
const port = process.env.PORT || 5000;
const server = app.listen(port);

console.log(`IsWebsiteUp starting on port ... ${port}`);

module.exports = server;
