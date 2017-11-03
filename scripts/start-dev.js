const config = require('../config/config');
const app = require('../src/app/routes');

app.listen(config.dev.port);