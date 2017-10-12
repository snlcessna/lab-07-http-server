'use strict';

// kelati setup server.js

const http = require('http');
const url = require('url');
const router = require('./routes.js');
const cowsay = require('cowsay');
const urlParser = require('./urlParser.js');
const bodyParser = require('./bodyParser.js')

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
    // console.log(req);
    res.write(`text: ${req.url.query['text']}`);
    console.log(cowsay.say({
        text: req.url.query['text'],
    }));
    res.end();
});

router.GET('/api', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('response to GET request message');
    // console.log(cowsay.saw({
    //     text:
    // }));
    res.end();
});

router.POST('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('response to POST request');
    bodyParser(req);
    console.log(cowsay.say({
        text: {'contect': '<cowsay cow>'},
    }));
    res.end();
});

const server = http.createServer(function(req, res) {
    req.url = url.parse(req.url);

    (router.routes[req.method][req.url.pathname] || router.couldNotFind)(req,res);
});

server.listen(3000);
