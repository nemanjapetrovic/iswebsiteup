const pingService = require('./../services/ping');

exports.index = async (req, res) => {
  res.render('./index.ejs');
};

exports.ping = async (req, res) => {
  const url = req.query.url;
  const pingResult = await pingService.pingUrl(url);
  res.status(200).json(pingResult);
};
