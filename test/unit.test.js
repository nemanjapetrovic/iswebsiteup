/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const pingService = require('./../src/services/ping');
const chai = require('chai');

const expect = chai.expect;

describe('IsWebsiteUp - Unit tests', () => {
  describe('Ping service arguments check', () => {
    it('Call ping service without any argument', async () => {
      try {
        await pingService.pingUrl();
      } catch (err) {
        expect(() => { throw err; }).to.throw(Error, 'Argument url is undefined or null');
      }
    });
  });

  describe('Ping service test of websites which are DOWN', () => {
    it('[Timeout] googles.com timeout', async () => {
      const pingResult = await pingService.pingUrl('googles.com');
      expect(pingResult.status).to.be.equal(0);
      expect(pingResult.message).to.be.equal('Down');
    });

    it('[Not Exist] aslkclakslkas.com check', async () => {
      const pingResult = await pingService.pingUrl('aslkclakslkas.com');
      expect(pingResult.status).to.be.equal(0);
      expect(pingResult.message).to.be.equal('Down');
    });

    it('PORT check', async () => {
      const pingResult = await pingService.pingUrl('nempet.com:8527');
      expect(pingResult.status).to.be.equal(0);
      expect(pingResult.message).to.be.equal('Down');
    });
  });

  describe('Ping service test of websites which are UP', () => {
    it('URL without protocol', async () => {
      const pingResult = await pingService.pingUrl('switchplus.ch');
      expect(pingResult.status).to.be.equal(301);
      expect(pingResult.message).to.be.equal('Up');
    });

    it('URL with HTTP protocol', async () => {
      const pingResult = await pingService.pingUrl('http://google.com');
      expect(pingResult.status).to.be.equal(301);
      expect(pingResult.message).to.be.equal('Up');
    });

    it('URL with HTTPS protocol', async () => {
      const pingResult = await pingService.pingUrl('https://google.com');
      expect(pingResult.status).to.be.equal(301);
      expect(pingResult.message).to.be.equal('Up');
    });

    it('URL with WWW and without protocol', async () => {
      const pingResult = await pingService.pingUrl('www.google.com');
      expect(pingResult.status).to.be.equal(200);
      expect(pingResult.message).to.be.equal('Up');
    });

    it('URL with WWW and HTTP protocol', async () => {
      const pingResult = await pingService.pingUrl('http://www.google.com');
      expect(pingResult.status).to.be.equal(200);
      expect(pingResult.message).to.be.equal('Up');
    });

    it('URL with WWW and HTTPS protocol', async () => {
      const pingResult = await pingService.pingUrl('https://www.google.com');
      expect(pingResult.status).to.be.equal(200);
      expect(pingResult.message).to.be.equal('Up');
    });

    it('Umlaut URL', async () => {
      const pingResult = await pingService.pingUrl('öbb.at');
      expect(pingResult.status).to.be.equal(302);
      expect(pingResult.message).to.be.equal('Up');
    });

    it('Long URL check', async () => {
      const pingResult = await pingService.pingUrl('nempet.com/mongoose-morgan/mongoose-morgan.html');
      expect(pingResult.status).to.be.equal(301);
      expect(pingResult.message).to.be.equal('Up');
    });
  });
});
