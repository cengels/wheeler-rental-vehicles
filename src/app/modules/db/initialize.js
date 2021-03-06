const pool = require('./pool');
const createTables = require('./create-tables');
const restoreMockData = require('./restore-mock-data');
const logger = require('../Logger')(module.id);

pool.connect()
	.then(client => {
		if (process.env.NODE_ENV === 'development') {
			return restoreMockData(client)
				.catch(err => logger.serverError(
					'Unexpected error filling database with mock data',
					err.stack
				))
				.then(() => client.release());
		}

		return createTables(client)
			.catch(err => logger.serverError(
				'Unexpected error creating tables',
				err.stack
			))
			.then(() => client.release());
	})
	.catch((err) => logger.serverError(
		'Failed to connect to database',
		err.stack
	));