const pool = require('./pool');
const createTables = require('./create-tables');
const restoreMockData = require('./restore-mock-data');
const logger = require('../Logger')(module.id);

pool.connect()
	.then(client => {
		const logError = (loggerMessage) => (err) => {
			logger.serverError(loggerMessage, err.stack);
			client.release();
		};

		if (process.env.NODE_ENV === 'development') {
			return restoreMockData(client)
				.then(() => client.release())
				.catch(logError('Unexpected error filling database with mock data'));
		} else {
			return createTables(client)
				.then(() => client.release())
				.catch(logError('Unexpected error creating tables'));
		}
	}).catch((err) => logger.serverError('Failed to connect to database', err.stack));