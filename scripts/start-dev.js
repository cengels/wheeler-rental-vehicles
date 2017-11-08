const config = require('../config/config');
const app = require('../src/app/app');

app.listen(config.dev.port);