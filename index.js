'use strict';

const server = require('./lib/server.js');

require('dotenv').config();

server.listen(process.env.PORT || 5000);
