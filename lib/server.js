'use strict';

// kelati setup server.js

const http = require('http');
const url = require('url');
const router = require('./routes.js');
const cowsay = require('cowsay');
const urlParser = require('./urlParser.js');
const bodyParser = require('./bodyParser.js');

const callCowsay = (text) => {
    console.log(cowsay.say({
        text: text
    }));
};

router.GET('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('response to GET request');
    //rewrite this as cowsay function
    callCowsay('GET Request 200 Response');
    res.end();
});

router.GET('/cowsay', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    urlParser(req);
    res.write(`text: ${req.url.query['text']}`);

    callCowsay(req.url.query['text']);
    res.end();
});

// do we need this?
// router.GET('/api', function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.write('response to GET request message');
//     //rewrite this as cowsay function
//     callCowsay('Response to GET request message');
//     res.end();
// });

router.POST('/api/cowsay', function(req, res) {

    bodyParser(req).then(parsedBody => {

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(`Cowsay Message: ${JSON.stringify(parsedBody.body)}`);
 
        callCowsay(JSON.stringify(parsedBody.body));
        res.end();
    }).catch((err) => {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(`Error: ${err}`);
        callCowsay(`Uh-oh, an error!: ${err}`);

        res.end();
    });
});

const server = http.createServer(function(req, res) {
    req.url = url.parse(req.url);

    (router.routes[req.method][req.url.pathname] || router.couldNotFind)(req,res);
});


module.exports = server;
