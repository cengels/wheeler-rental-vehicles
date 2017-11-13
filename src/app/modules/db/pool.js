const config = require('../../../../config/config');
const pg = require('pg');

const options = process.env.NODE_ENV === 'production'
    ? {
        user: config.prod.db.user,
        host: config.prod.db.host,
        database: 'rentaldb',
        password: config.prod.db.password,
        port: config.prod.db.port,
    }
    : {
        user: config.dev.db.user,
        host: config.dev.db.host,
        database: 'rentaldb',
        password: config.dev.db.password,
        port: config.dev.db.port,
    };

module.exports = new pg.Client(options);