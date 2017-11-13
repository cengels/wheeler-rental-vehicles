const config = require('config');
const app = process.env.NODE_ENV === 'production' ? require('../dist/app/app') : require('../src/app/app');
const port = config.get('app.port');

app.listen(port);