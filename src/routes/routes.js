module.exports = function (app) {
    app.use('/', require('./index'));

    // Handle 404 - Not Found
    app.use(function (req, res) {
        res.status(404).send('404: Page not Found');
    });

    // Handle 500 - Internal Server Error
    app.use(function (err, req, res, next) {
        console.log(err);
        res.status(500).send('500: Internal Server Error');
    });
};