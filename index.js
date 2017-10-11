'use strict';

const server = require('./lib.server.js');

require('dotenv').config();

server.start(process.env.PORT | 5000);
