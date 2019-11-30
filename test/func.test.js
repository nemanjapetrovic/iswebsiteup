const request = require('supertest');

describe('IsWebsiteUp tests', () => {
    let server;

    beforeEach(() => {
        server = require('./test-server')();
    });

    afterEach((done) => {
        server.close(done);
    });

    it('route /', (done) => {
        request(server)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('400 bad req', (done) => {
        request(server)
            .get('/some-not-valid-url')
            .expect(400)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('404 not found', (done) => {
        request(server)
            .get('/notfound/notfound')
            .expect(404)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('[DOWN] [Timeout] gasas.com timeout', (done) => {
        request(server)
            .get('/gasas.com')
            .expect(200, {
                status: 'Unknown',
                message: 'Down'
            }, done);
    });

    it('[DOWN] [Not Exist] aslkclakslkas.com check', (done) => {
        request(server)
            .get('/aslkclakslkas.com')
            .expect(200, {
                status: 'Unknown',
                message: 'Down'
            }, done);
    });

    it('[UP] hcp.switchplus.ch check', (done) => {
        request(server)
            .get('/hcp.switchplus.ch')
            .expect(200, {
                status: 301,
                message: 'Up'
            }, done);
    });

    it('[UP] google.com check', (done) => {
        request(server)
            .get('/google.com')
            .expect(200, {
                status: 301,
                message: 'Up'
            }, done);
    });

    it('[UP] http://google.com check', (done) => {
        request(server)
            .get('/http%3A%2F%2Fgoogle.com')
            .expect(200, {
                status: 301,
                message: 'Up'
            }, done);
    });

    it('[UP] https://google.com check', (done) => {
        request(server)
            .get('/https%3A%2F%2Fgoogle.com')
            .expect(200, {
                status: 301,
                message: 'Up'
            }, done);
    });

    it('[UP] www.google.com check', (done) => {
        request(server)
            .get('/www.google.com')
            .expect(200, {
                status: 200,
                message: 'Up'
            }, done);
    });

    it('[UP] http://www.google.com check', (done) => {
        request(server)
            .get('/http%3A%2F%2Fwww.google.com')
            .expect(200, {
                status: 200,
                message: 'Up'
            }, done);
    });

    it('[UP] https://www.google.com check', (done) => {
        request(server)
            .get('/https%3A%2F%2Fwww.google.com')
            .expect(200, {
                status: 200,
                message: 'Up'
            }, done);
    });

    it('[UP] nikos-hosting.com check', (done) => {
        request(server)
            .get('/nikos-hosting.com')
            .expect(200, {
                status: 200,
                message: 'Up'
            }, done);
    });

    it('[UP] http://nikos-hosting.com check', (done) => {
        request(server)
            .get('/http%3A%2F%2Fnikos-hosting.com')
            .expect(200, {
                status: 200,
                message: 'Up'
            }, done);
    });

    it('[DOWN] [NO SSL] https://nikos-hosting.com check', (done) => {
        request(server)
            .get('/https%3A%2F%2Fnikos-hosting.com')
            .expect(200, {
                status: 'Unknown',
                message: 'Down'
            }, done);
    });

    it('[UP] www.nikos-hosting.com check', (done) => {
        request(server)
            .get('/www.nikos-hosting.com')
            .expect(200, {
                status: 200,
                message: 'Up'
            }, done);
    });

    it('[UP] http://www.nikos-hosting.com check', (done) => {
        request(server)
            .get('/http%3A%2F%2Fwww.nikos-hosting.com')
            .expect(200, {
                status: 200,
                message: 'Up'
            }, done);
    });

    it('[DOWN] [NO SSL] https://www.nikos-hosting.com check', (done) => {
        request(server)
            .get('/https%3A%2F%2Fwww.nikos-hosting.com')
            .expect(200, {
                status: 'Unknown',
                message: 'Down'
            }, done);
    });

    it('[UP] [Umlaut] städteflüge.com check', (done) => {
        request(server)
            .get('/städteflüge.com')
            .expect(200, {
                status: 200,
                message: 'Up'
            }, done);
    });

    it('[UP] LONG URL check', (done) => {
        request(server)
            .get('/nempet.me%2Fmongoose-morgan%2Fmongoose-morgan.html')
            .expect(200, {
                status: 301,
                message: 'Up'
            }, done);
    });

    it('[DOWN] PORT check', (done) => {
        request(server)
            .get('/nempet.me:8527')
            .expect(200, {
                status: 'Unknown',
                message: 'Down'
            }, done);
    });

});