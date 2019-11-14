const child_process = require('child_process');

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
        const command = `curl --max-time 3.0 -I -H "User-Agent: IsWebsiteUp | check if website is down or up right now? (+https://iswebsiteup.com)" ${url}`
        const response = child_process.execSync(command).toString();

        let responseStatus = null;
        if (response.startsWith('HTTP/2')) {
            responseStatus = response.substring(7, 10);
        } else {
            responseStatus = response.substring(9, 12);
        }

        const websiteUp = ok_codes.some(code => code == responseStatus) ? 1 : 0;
        addCheck(url, websiteUp);

        res.status(200).send('ok');
    } catch (err) {
        addCheck(url, 0);
        res.status(200).send('not ok');
    }
};

/*
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
//Help from: thanks!
//https://github.com/sjparkinson/isitup.org/blob/master/src/functions.php
*/