'use strict';

const expect = require('expect');
const request = require('superagent');
require('dotenv').config();
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
                expect(res.text).toEqual('response to GET request');
                done();
            });
    });

    //GET w/MESSAGE
    it('should respond with what we sent as text={message}', (done) => {
        let getMessage = 'text=helloKelati';
        request.get(`${host}/cowsay?${getMessage}`).end((err, res) => {
            expect(err).toBe(null);
            
            expect(res.text).toEqual('text: helloKelati');
            done();
        });
    });

    // //POST
    it('should return a JSON body object of what we sent via POST', (done) => {
        request.post(`${host}/api/cowsay`)
            .set('Content-Type', 'text/plain')
            .send('{"body":"helloKelati"}').end((err, res) => {
                expect(err).toBe(null);
                expect(res.text).toEqual('Cowsay Message: {"body":"helloKelati"}'); 
                done();
            });
    });

    //POST No Body
    it('should send a message saying body is required if we post nothing', (done) => {
        request.post(`${host}/api/cowsay`)
            .set('Content-Type', 'text/plain').send('').end((err, res) => {
   
                expect(res.text).toEqual('Error: {"error": "invalid request: body required"}');
                done();
            });
    });

    //POST invalid body
    it('should say body value is required if we leave body= as blank', (done) => {
        request.post(`${host}/api/cowsay`)
            .set('Content-Type', 'text/plain').send('{"body":""}').end((err, res) => {

                expect(res.text).toEqual('Error: {"error": "invalid request: text query required"}');
                done();
            });
    });
    // //404
    it('should give a message saying we cannot find page', (done) => {
        request.get(`${host}/notaurl`).end((err, res) => {
            console.log('res: ',res.text);
            expect(res.text).toEqual('could not find page');
            done();
        });
    });

});