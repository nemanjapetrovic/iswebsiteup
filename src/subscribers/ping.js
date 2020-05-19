const EventEmmiter = require('events');
const telegramPush = require('telegram-push');

const events = require('./events');

const pingEmmiter = new EventEmmiter();
pingEmmiter.on(events.onPing, async (url) => {
  if (process.env.TELEGRAM_LOGGER_ACTIVATED === '1') {
    telegramPush.sendAsync(process.env.TELEGRAM_LOGGER_BOT_CHAT_ID, url);
  }
});

function onPing (url) {
  pingEmmiter.emit(events.onPing, url);
}

module.exports = onPing;
