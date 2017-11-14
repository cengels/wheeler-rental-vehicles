const config = require('config');
const { Pool, types } = require('pg');
const logger = require('../Logger')(module.id);

const options = config.get('db');

const DATE_OID = 1082;

types.setTypeParser(DATE_OID, (val) => val === null ? null : val);

const pool = new Pool(options);

pool.on('error', (err, client) => {
	logger.serverError('Unexpected error on idle client', err.stack, client);
	throw Error('Unexpected error on idle client');
});

module.exports = pool;