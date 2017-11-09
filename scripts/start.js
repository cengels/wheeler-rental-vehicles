process.env.NODE_ENV = 'production';

const config = require('../config/config');
const app = require('../src/app/app');

app.listen(config.prod.port);