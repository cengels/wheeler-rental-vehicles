const config = require('../config/config');
const app = require('../src/app/app');

process.env.NODE_ENV = 'development';

app.listen(config.dev.port);