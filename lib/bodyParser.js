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

                Object.keys(request.body).forEach(key => {
                    if (request.body[key] === '') return reject(`{"error": "invalid request: text query required"}`);
                    resolve(request);
                });
            } catch (err) {
                console.log(err.message);
                if (err.message === 'Unexpected end of JSON input') {
                    reject(`{"error": "invalid request: body required"}`);
                }
                reject('Invalid JSON');
            }
        });
    });
};
