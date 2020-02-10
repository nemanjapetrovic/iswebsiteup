const validator = require('validator');

// middleware which will check if the URL sent as parameter is a valid URL
module.exports = function () {
    return function (req, res, next) {
        const checkUrl = req.params.url;

        if (checkUrl === null ||
            checkUrl === undefined ||
            !validator.isURL(checkUrl)) {
            res.sendStatus(400);
            return false;
        }

        return next();
    };
};