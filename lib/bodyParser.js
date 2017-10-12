'use strict';

let errorHandler = require('./errorHandler.js');

module.exports = (request) => {
    return new Promise((resolve, reject) => {
        let text = '';

        request.on('data', buffer => {
            text += buffer.toString();
        });

        request.on('end', () => {
            try {
                request.body = JSON.parse(text);
                resolve(request);
            } catch (err) {
                errorHandler(err);
                reject('Invalid JSON');
            }
        });
    });
};
