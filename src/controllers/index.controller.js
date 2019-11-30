const got = require('got');

const okCodes = [200, 301, 302, 303, 304, 307, 400, 401, 403, 405];

exports.index = async function (req, res) {
    res.render('./index.ejs');
};

exports.checkUrl = async function (req, res) {
    let url = req.params.url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url; // If HTTP protocol is not defined always go with HTTP check
    }
    url = new URL(url);

    try {
        const body = await got.head(url.href, {
            timeout: 300,
            retry: {
                retries: 0
            },
            headers: {
                'user-agent': 'IsWebsiteUp | check if website is down or up right now? (+https://iswebsiteup.com)'
            },
            followRedirect: false
        });

        const websiteUp = okCodes.some(code => code == body.statusCode) ? true : false;

        ///muzic puzic <3

        if (websiteUp) {
            res.status(200).json({
                status: body.statusCode,
                message: 'Up'
            });

            return false;
        }

        res.status(200).json({
            status: body.statusCode,
            message: 'Down'
        });
    } catch (err) {
        res.status(200).json({
            status: 'Unknown',
            message: 'Down'
        });
    }
};

//TODO: google analytics