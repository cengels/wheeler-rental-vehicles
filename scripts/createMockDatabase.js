const pool = require(`../dist/app/modules/db/pool`);
const restoreMockData = require(`../dist/app/modules/db/restore-mock-data`);
const logger = require(`../dist/app/modules/Logger`)(module.id);

pool.connect()
	.then(client => restoreMockData(client)
		.then(() => client.release())
		.catch((err) => {
			logger.serverError('Unexpected error filling database with mock data', err.stack);
			client.release();
		}))
	.catch((err) => logger.serverError('Failed to connect to database', err.stack))
	.then(() => pool.end());