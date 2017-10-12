'use strict';

// kelati setup server.js

const http = require('http');
const url = require('url');
const router = require('./routes.js');
const cowsay = require('cowsay');
const urlParser = require('./urlParser.js');
const bodyParser = require('./bodyParser.js');

router.GET('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('response to GET request');
    console.log(cowsay.say({
        text: 'Go Cougs! #8 Baby!',
    }));
    res.end();
});

router.GET('/cowsay', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    urlParser(req);
    res.write(`text: ${req.url.query['text']}`);
    console.log(cowsay.say({
        text: req.url.query['text'],
    }));
    res.end();
});

router.GET('/api', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('response to GET request message');
    console.log(cowsay.say({
        text: 'response to GET request message',
    }));
    res.end();
});

router.POST('/', function(req, res) {

    // Need to use bodyParser to check the body for:
    // Is there JSON?
    // Is the JSON valid?
    // Response to all 3 things based on what it says in README. 
    bodyParser(req).then(req => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(`Response: ${req.body['body']}`);
        res.end();
        console.log(cowsay.say({
            text: `Response: ${req.body['body']}`,
        }));
    }).catch(err => res.write(err));
});

const server = http.createServer(function(req, res) {
    req.url = url.parse(req.url);

    (router.routes[req.method][req.url.pathname] || router.couldNotFind)(req,res);
});


module.exports = server;