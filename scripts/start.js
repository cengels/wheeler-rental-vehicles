console.log(process.env.NODE_ENV);

const config = require('../config/config');
const app = process.env.NODE_ENV === 'production' ? require('../dist/app/app') : require('../src/app/app');
const port = process.env.NODE_ENV === 'production' ? config.prod.port : config.dev.port;

app.listen(port);