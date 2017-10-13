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
    //rewrite this as cowsay function
    console.log(cowsay.say({
        text: 'Go Cougs! #8 Baby!',
    }));
    res.end();
});

router.GET('/cowsay', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    urlParser(req);
    res.write(`text: ${req.url.query['text']}`);
    //rewrite this as cowsay function
    console.log(cowsay.say({
        text: req.url.query['text'],
    }));
    res.end();
});

// do we need this?
router.GET('/api', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('response to GET request message');
    //rewrite this as cowsay function
    console.log(cowsay.say({
        text: 'response to GET request message',
    }));
    res.end();
});

router.POST('/api/cowsay', function(req, res) {

    bodyParser(req).then((req, err) => {
        if (err === null) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(`Cowsay Message: ${req.body}`);
            // put cowsay function here
            res.end();
        } else {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write(`Error: ${err}`);
            // cowsay function here
            res.end();
        }
    });
});

const server = http.createServer(function(req, res) {
    req.url = url.parse(req.url);

    (router.routes[req.method][req.url.pathname] || router.couldNotFind)(req,res);
});


module.exports = server;
