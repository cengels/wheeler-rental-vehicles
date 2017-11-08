const config = require('../config/config');
const app = require('../src/app/app');

process.env.NODE_ENV = 'production';

// TODO: Register a webserver
// app.listen(config.prod.port);