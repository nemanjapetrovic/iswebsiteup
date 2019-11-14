const express = require('express');
const router = express.Router();

const indexController = require('./../controllers/index.controller');

const validateUrl = require('./../middleware/validation/url.validate');

router.get('/', indexController.index);

router.get('/:url', [validateUrl()], indexController.checkUrl);

module.exports = router;