'use strict';

// kelati setup server.js

const http = require('http');
const url = require('url');
const router = require('./routes.js');

const server = http.createServer(function(req, res) {
    req.url = url.parse(req.url);
});

server.listen(3000);
