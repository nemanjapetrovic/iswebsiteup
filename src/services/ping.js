const got = require('got');

const constants = require('./../config/constants');

exports.pingUrl = async (url) => {
  try {
    if (url == null) {
      throw new Error('Argument url is undefined or null');
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url; // If protocol is not defined always go with HTTP
    }

    url = new URL(url);

    const body = await got.head(url.href, {
      timeout: 1500,
      retry: {
        limit: 0
      },
      headers: {
        'user-agent': 'IsWebsiteUp | check if website is down or up right now? (+https://iswebsiteup.com)'
      },
      followRedirect: false
    });

    const websiteUp = constants.okCodes.some(code => code === body.statusCode);

    /// muzic puzic <3

    if (websiteUp) {
      return {
        status: body.statusCode,
        message: 'Up'
      };
    }

    return {
      status: body.statusCode,
      message: 'Down'
    };
  } catch (err) {
    return {
      status: 'Unknown',
      message: 'Down'
    };
  }
};
