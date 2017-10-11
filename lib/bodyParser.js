'use strict';

let errorHandler = require('./errorHander.js');

module.exports = (request) => {
    return new Promise((resolve, reject) => {
        let text = '';

        request.on('data', buffer => {
            text += buffer.toString();
        });

        request.on('end', () => {
            try {
                request.body = JSON.parse(text);
            } catch (err) {
                errorHandler(err);
                reject(err);
            }
        });
    });
};