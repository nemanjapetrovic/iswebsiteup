const fs = require('fs');
const path = require('path');

const pingService = require('./../services/ping');

exports.index = async (req, res) => {
  res.render('./index.ejs');
};

exports.seo = async (req, res) => {
  let page = req.params.page;
  if (page === undefined) {
    res.status(404).send('404: Page not Found');
    return;
  }

  page += '.ejs';
  const viewPath = path.join(__dirname, '..', 'views', page);
  if (!fs.existsSync(viewPath)) {
    res.status(404).send('404: Page not Found');
    return;
  }

  res.render(`./${page}`);
};

exports.ping = async (req, res) => {
  const url = req.query.url;
  const pingResult = await pingService.pingUrl(url);
  res.status(200).json(pingResult);
};
