const morgan = require('morgan');
const stream = require('stream');
const carrier = require('carrier');
const telegramPush = require('telegram-push');
const passStream = new stream.PassThrough();

module.exports = function Logger(format, options) {

    format = format || 'combined';
    options = options || {};

    // Create stream to read from
    var lineStream = carrier.carry(passStream);
    lineStream.on('line', onLine);

    // Morgan options stream
    options.stream = passStream;

    function onLine(line) {
        if (process.env.TELEGRAM_LOGGER_ACTIVATED == 1) {
            telegramPush.sendAsync(process.env.TELEGRAM_LOGGER_BOT_CHAT_ID, line);
        }
    }

    var morganLogger = morgan(format, options);
    return morganLogger;
};