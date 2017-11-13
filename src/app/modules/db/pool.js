const config = require('../../../../config/config');
const { Pool } = require('pg');
const logger = require('../Logger')(module.id);

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

const pool = new Pool(options);

pool.on('error', (err, client) => {
    logger.serverError('Unexpected error on idle client', err.stack, client);
    throw Error('Unexpected error on idle client');
});

module.exports = pool;