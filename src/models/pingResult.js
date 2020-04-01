class PingResult {
  constructor (status, message) {
    this.status = status;
    this.message = message;
  }

  update (status, message) {
    this.status = status;
    this.message = message;
  }
}

module.exports = PingResult;
