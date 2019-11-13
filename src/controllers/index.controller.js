const got = require('got');

const checkLib = require('./../sdk/lib/check.lib');

const ok_codes = [200, 301, 302, 303, 304, 307, 400, 401, 403, 405];

addCheck = async function (url, status) {
    checkLib.addCheck(url, status).catch(err => {
        console.log(err);
    });
};

exports.index = async function (req, res) {
    res.render('./index.ejs');
};

exports.checkUrl = async function (req, res) {
    const url = req.query.url;
    try {
        const body = await got.head(url, {
            timeout: 300,
            retry: {
                retries: 0
            },
            headers: {
                'user-agent': 'IsWebsiteUp | check if website is down or up right now? (+https://iswebsiteup.com)'
            },
            followRedirect: false
        });

        const websiteUp = ok_codes.some(code => code == body.statusCode) ? 1 : 0;
        addCheck(url, websiteUp);

        res.status(200).send('ok');
    } catch (err) {
        addCheck(url, 0);

        if (err.code != 'ENOTFOUND') {
            console.log(err);
            res.sendStatus(500);
            return false;
        }

        res.status(200).send('not ok');
    }
};

//https://github.com/sjparkinson/isitup.org/blob/master/src/functions.php

//timeout problem za hcp.switchplus.ch
//port
//nobody