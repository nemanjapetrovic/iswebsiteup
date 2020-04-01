const got = require('got');

const constants = require('./../config/constants');
const PingResult = require('./../models/pingResult');

exports.pingUrl = async (url) => {
  if (url == null) {
    throw new Error('Argument url is undefined or null');
  }

  const pingResult = new PingResult(0, 'Down');
  try {
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
      pingResult.update(body.statusCode, 'Up');
      return pingResult;
    }

    pingResult.update(body.statusCode, 'Down');
    return pingResult;
  } catch (err) {
    // activate error sending if needed any time in the future
    // telegramPush.sendAsync(process.env.TELEGRAM_LOGGER_BOT_CHAT_ID, JSON.stringify(err));
    return pingResult;
  }
};
