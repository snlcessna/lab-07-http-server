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
                (text.length === 0) ? reject('Please enter values like so: key=value') : resolve(request);
                resolve(request);
            } catch (err) {
                reject('Invalid JSON');
            }
        });
    });
};
