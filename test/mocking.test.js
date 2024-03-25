/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const sinon = require('sinon');
const pingService = require('../src/services/ping');

describe('Ping Service - Mocking testing', function () {
  let pingUrlMock;

  beforeEach(function () {
    pingUrlMock = sinon.stub(pingService, 'pingUrl');
  });

  afterEach(function () {
    pingUrlMock.restore();
  });

  it('should return true when website is up', () => {
    const mockResponse = { statusCode: 200, status: 'Up' };
    pingUrlMock.returns(mockResponse);

    const result = pingService.pingUrl('http://example.com');
    chai.expect(result).to.deep.equal(mockResponse);
  });

  it('should return false when website is down', () => {
    const mockResponse = { statusCode: 500, status: 'Down' };
    pingUrlMock.returns(mockResponse);

    const result = pingService.pingUrl('http://example.com');
    chai.expect(result).to.deep.equal(mockResponse);
  });
});
