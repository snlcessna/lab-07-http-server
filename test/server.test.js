'use strict';

const expect = require('expect');
const request = require('superagent');

const server = require('../lib/server.js');

const host = `localhost:${process.env.PORT | 3000}`;

describe('Testing HTTP Server', () => {
    before((done) => {
        server.listen(process.env.PORT || 5000, done);
    });

    after((done) => {
        server.close(done);
    });


    //GET
    it('Should get a response when testing GET', (done) => {
        request
            .get(`${host}/`)
            .end((err, res) => {
                expect(err).toBe(null);
                expect(res.test).toEqual();
                done();
            });
    });

    //GET w/MESSAGE
    it('should respond with what we sent as text={message}', (done) => {
        let getMessage = 'text=helloKelati';
        request.get(`${host}/cowsay?${getMessage}`).end((err, res) => {
            expect(err).toBe(null);
            expect(res.text).toEqual();
            done();
        });
    });

    //POST
    it('should ')

});