const config = require('../../../../config');
const { Pool, types } = require('pg');
const logger = require('../Logger')(module.id);

const options = config.get('db');

const DATE_OID = 1082;

types.setTypeParser(
	DATE_OID,
	// eslint-disable-next-line no-confusing-arrow
	val => val === null
		? null
		: val
);

const pool = new Pool(options);

const logError = (err, client) => {
	logger.serverError('Unexpected error on idle client', err.stack, client);
	throw Error('Unexpected error on idle client');
};

pool.on('error', logError);

module.exports = pool;