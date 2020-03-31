/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const pingService = require('./../src/services/ping');
const chai = require('chai');

const expect = chai.expect;

describe('IsWebsiteUp Unit tests', () => {
  describe('Logger test', () => {
    it('Create instance of a logger', (done) => {
      var logger = require('../src/config/http.logger');
      logger();
      done();
    });
  });

  describe('Test of websites which are DOWN', () => {
    it('[Timeout] gasas.com timeout', async () => {
      const pingResult = await pingService.pingUrl('gasas.com');
      expect(pingResult.status).to.be.equal(0);
      expect(pingResult.message).to.be.equal('Down');
    });

    it('[Not Exist] aslkclakslkas.com check', async () => {
      const pingResult = await pingService.pingUrl('aslkclakslkas.com');
      expect(pingResult.status).to.be.equal(0);
      expect(pingResult.message).to.be.equal('Down');
    });

    it('[NO SSL] https://nikos-hosting.com check', async () => {
      const pingResult = await pingService.pingUrl('https://nikos-hosting.com');
      expect(pingResult.status).to.be.equal(0);
      expect(pingResult.message).to.be.equal('Down');
    });

    it('PORT check', async () => {
      const pingResult = await pingService.pingUrl('nempet.me:8527');
      expect(pingResult.status).to.be.equal(0);
      expect(pingResult.message).to.be.equal('Down');
    });

    it('[NO SSL] https://www.nikos-hosting.com check', async () => {
      const pingResult = await pingService.pingUrl('https://www.nikos-hosting.com');
      expect(pingResult.status).to.be.equal(0);
      expect(pingResult.message).to.be.equal('Down');
    });
  });

  describe('Ping service test', () => {
    it('URL without protocol', async () => {
      const pingResult = await pingService.pingUrl('hcp.switchplus.ch');
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
      const pingResult = await pingService.pingUrl('städteflüge.com');
      expect(pingResult.status).to.be.equal(200);
      expect(pingResult.message).to.be.equal('Up');
    });

    it('Long URL check', async () => {
      const pingResult = await pingService.pingUrl('nempet.me/mongoose-morgan/mongoose-morgan.html');
      expect(pingResult.status).to.be.equal(301);
      expect(pingResult.message).to.be.equal('Up');
    });
  });
});
