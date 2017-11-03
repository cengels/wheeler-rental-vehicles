const config = require('../../../../config/config');
const pg = require('pg');

module.exports = new pg.Client({
    user: config.dev.db.user,
    host: config.dev.db.host,
    database: 'rentaldb',
    password: config.dev.db.password,
    port: config.dev.db.port,
});