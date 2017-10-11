'use strict';

const url = require('url');
const queryString = require('querystring');

module.exports = (request) => {
    request.url = url.parse(request.url);
    request.url.query = queryString.parse(request.url.query);

    console.log('Request URL: ', request.url);
    console.log('Request Query: ', request.url.query);

    return;
}