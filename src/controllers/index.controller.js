const got = require('got');
const punycode = require('punycode');

const okCodes = [200, 301, 302, 303, 304, 307, 400, 401, 403, 405];

exports.index = async function (req, res) {
    res.render('./index.ejs');
};

exports.checkUrl = async function (req, res) {
    let url = req.params.url;
    url = url.replace(/^(?:https?:)?\/\//, '');
    url = url + 'http://';
    url = punycode.toASCII(url);

    try {
        const body = await got.head(url, {
            timeout: process.env.CHECK_TIMEOUT, //TODO: Lower timeout - test with bla.com
            retry: {
                retries: 0
            },
            headers: {
                'user-agent': 'IsWebsiteUp | check if website is down or up right now? (+https://iswebsiteup.com)'
            },
            followRedirect: false
        });

        const websiteUp = okCodes.some(code => code == body.statusCode) ? 1 : 0;

        ///muzic puzic <3

        res.status(200).json({
            status: body.statusCode,
            message: 'Up'
        });
    } catch (err) {
        res.status(200).json({
            status: 'Unknown',
            message: 'Down'
        });
    }
};