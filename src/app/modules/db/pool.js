const config = require('config');
const { Pool } = require('pg');
const logger = require('../Logger')(module.id);

const options = config.get('db');

const pool = new Pool(options);

pool.on('error', (err, client) => {
	logger.serverError('Unexpected error on idle client', err.stack, client);
	throw Error('Unexpected error on idle client');
});

module.exports = pool;