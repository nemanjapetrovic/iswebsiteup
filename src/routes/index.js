const express = require('express');
const router = express.Router();

const indexController = require('./../controllers/index');

const validateUrl = require('./../middleware/validation/url.validate');

router.get('/', indexController.index);

router.get('/ping', [validateUrl()], indexController.ping);

router.get('/:page', indexController.seo);

module.exports = router;
