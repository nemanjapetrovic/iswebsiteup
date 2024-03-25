/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('IsWebsiteUp - Integration tests', () => {
  after(() => {
    server.close();
  });

  describe('Basic routes tests', () => {
    it('route /', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('400 bad req', (done) => {
      chai.request(server)
        .get('/ping?url=someNotValidUrl')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });

    it('404 not found', (done) => {
      chai.request(server)
        .get('/notfound/notfound')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('Test of websites which are DOWN', () => {
    it('[Timeout] googles.com timeout', (done) => {
      chai.request(server)
        .get('/ping?url=googles.com')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 0,
            message: 'Down'
          });
          done();
        });
    });

    it('[Not Exist] aslkclakslkas.com check', (done) => {
      chai.request(server)
        .get('/ping?url=aslkclakslkas.com')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 0,
            message: 'Down'
          });
          done();
        });
    });

    it('PORT check', (done) => {
      chai.request(server)
        .get('/ping?url=nempet.com:8527')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 0,
            message: 'Down'
          });
          done();
        });
    });
  });

  describe('Test of websites which are UP', () => {
    it('switchplus.ch check', (done) => {
      chai.request(server)
        .get('/ping?url=switchplus.ch')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 301,
            message: 'Up'
          });
          done();
        });
    });

    it('google.com check', (done) => {
      chai.request(server)
        .get('/ping?url=google.com')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 301,
            message: 'Up'
          });
          done();
        });
    });

    it('http://google.com check', (done) => {
      chai.request(server)
        .get('/ping?url=http%3A%2F%2Fgoogle.com')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 301,
            message: 'Up'
          });
          done();
        });
    });

    it('https://google.com check', (done) => {
      chai.request(server)
        .get('/ping?url=https%3A%2F%2Fgoogle.com')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 301,
            message: 'Up'
          });
          done();
        });
    });

    it('www.google.com check', (done) => {
      chai.request(server)
        .get('/ping?url=www.google.com')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 200,
            message: 'Up'
          });
          done();
        });
    });

    it('http://www.google.com check', (done) => {
      chai.request(server)
        .get('/ping?url=http%3A%2F%2Fwww.google.com')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 200,
            message: 'Up'
          });
          done();
        });
    });

    it('https://www.google.com check', (done) => {
      chai.request(server)
        .get('/ping?url=https%3A%2F%2Fwww.google.com')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 200,
            message: 'Up'
          });
          done();
        });
    });

    it('nikos-hosting.com check', (done) => {
      chai.request(server)
        .get('/ping?url=nikos-hosting.com')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 200,
            message: 'Up'
          });
          done();
        });
    });

    it('http://nikos-hosting.com check', (done) => {
      chai.request(server)
        .get('/ping?url=http%3A%2F%2Fnikos-hosting.com')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 200,
            message: 'Up'
          });
          done();
        });
    });

    it('www.nikos-hosting.com check', (done) => {
      chai.request(server)
        .get('/ping?url=www.nikos-hosting.com')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 200,
            message: 'Up'
          });
          done();
        });
    });

    it('http://www.nikos-hosting.com check', (done) => {
      chai.request(server)
        .get('/ping?url=http%3A%2F%2Fwww.nikos-hosting.com')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 200,
            message: 'Up'
          });
          done();
        });
    });

    it('[Umlaut] öbb.at check', (done) => {
      chai.request(server)
        .get('/ping?url=öbb.at')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 302,
            message: 'Up'
          });
          done();
        });
    });

    it('LONG URL check', (done) => {
      chai.request(server)
        .get('/ping?url=nempet.com%2Fmongoose-morgan%2Fmongoose-morgan.html')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 301,
            message: 'Up'
          });
          done();
        });
    });
  });
});
