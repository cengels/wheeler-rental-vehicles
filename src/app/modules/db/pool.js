const config = require('config');
const { Pool } = require('pg');
const logger = require('../Logger')(module.id);

const options = {
	user: config.get('db.user'),
	host: config.get('db.host'),
	database: 'rentaldb',
	password: config.get('db.password'),
	port: config.get('db.port'),
};

const pool = new Pool(options);

pool.on('error', (err, client) => {
	logger.serverError('Unexpected error on idle client', err.stack, client);
	throw Error('Unexpected error on idle client');
});

module.exports = pool;