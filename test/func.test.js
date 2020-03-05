const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../src/app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('IsWebsiteUp tests', () => {

  after(()=>{
    server.close();
  });

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
      .get('/someNotValidUrl')
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

  it('[DOWN] [Timeout] gasas.com timeout', (done) => {
    chai.request(server)
      .get('/gasas.com')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          status: 'Unknown',
          message: 'Down'
        });
        done();
      });
  });

  it('[DOWN] [Not Exist] aslkclakslkas.com check', (done) => {
    chai.request(server)
      .get('/aslkclakslkas.com')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          status: 'Unknown',
          message: 'Down'
        });
        done();
      });
  });

  it('[UP] hcp.switchplus.ch check', (done) => {
    chai.request(server)
      .get('/hcp.switchplus.ch')
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

  it('[UP] google.com check', (done) => {
    chai.request(server)
      .get('/google.com')
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

  it('[UP] http://google.com check', (done) => {
    chai.request(server)
      .get('/http%3A%2F%2Fgoogle.com')
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

  it('[UP] https://google.com check', (done) => {
    chai.request(server)
      .get('/https%3A%2F%2Fgoogle.com')
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

  it('[UP] www.google.com check', (done) => {
    chai.request(server)
      .get('/www.google.com')
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

  it('[UP] http://www.google.com check', (done) => {
    chai.request(server)
      .get('/http%3A%2F%2Fwww.google.com')
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

  it('[UP] https://www.google.com check', (done) => {
    chai.request(server)
      .get('/https%3A%2F%2Fwww.google.com')
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

  it('[UP] nikos-hosting.com check', (done) => {
    chai.request(server)
      .get('/nikos-hosting.com')
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

  it('[UP] http://nikos-hosting.com check', (done) => {
    chai.request(server)
      .get('/http%3A%2F%2Fnikos-hosting.com')
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

  it('[DOWN] [NO SSL] https://nikos-hosting.com check', (done) => {
    chai.request(server)
      .get('/https%3A%2F%2Fnikos-hosting.com')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          status: 'Unknown',
          message: 'Down'
        });
        done();
      });
  });

  it('[UP] www.nikos-hosting.com check', (done) => {
    chai.request(server)
      .get('/www.nikos-hosting.com')
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

  it('[UP] http://www.nikos-hosting.com check', (done) => {
    chai.request(server)
      .get('/http%3A%2F%2Fwww.nikos-hosting.com')
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

  it('[DOWN] [NO SSL] https://www.nikos-hosting.com check', (done) => {
    chai.request(server)
      .get('/https%3A%2F%2Fwww.nikos-hosting.com')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          status: 'Unknown',
          message: 'Down'
        });
        done();
      });
  });

  it('[UP] [Umlaut] städteflüge.com check', (done) => {
    chai.request(server)
      .get('/städteflüge.com')
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

  it('[UP] LONG URL check', (done) => {
    chai.request(server)
      .get('/nempet.me%2Fmongoose-morgan%2Fmongoose-morgan.html')
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

  it('[DOWN] PORT check', (done) => {
    chai.request(server)
      .get('/nempet.me:8527')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          status: 'Unknown',
          message: 'Down'
        });
        done();
      });
  });
});
