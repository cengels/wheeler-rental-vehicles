const dbPool = require('../db/pool');
const logger = require('../Logger')(module.id);
const Status = require('../../definitions/status');

const getQueryText = (operation) => {
	switch (operation.toUpperCase()) {
		case 'SELECT':
			return 'SELECT * FROM';
		case 'DELETE':
			return 'DELETE FROM';
		default:
			return '';
	}
};

const buildQuery = (operation, table, params, query) => {
	const queryText = getQueryText(operation);

	if (Object.keys(params).length > 0 || Object.keys(query).length > 0) {
		const keys = Object.keys(params).concat(Object.keys(query));
		const values = Object.values(params).concat(Object.values(query));
		const whereConditions = keys
			.map((key, i) => `${key} = $${i + 1}`)
			.join(' AND ');
		return dbPool.query(
			`${queryText} ${table} WHERE ${whereConditions}`,
			values
		);
	}

	return dbPool.query(`${queryText} ${table}`);
};

const sendError = (res, operation) => (err) => {
	logger.serverError(`${operation} operation failed.`, err);
	res.status(Status.INTERNAL_SERVER_ERROR)
		.send(`${operation} operation failed. ${err}`);
};

const sendForeignKeyError = (res, err) => {
	const REGEX_NUMBER_FROM_STRING = /^Key \(([A-z]+)\)=\((\d)\)/;
	const match = err.detail
		.match(REGEX_NUMBER_FROM_STRING);

	logger.userError(err.detail);

	res.status(Status.BAD_REQUEST)
		.send('DELETE operation failed.'
			+ `${match[1]} ${match[2]} is still in use by ${err.table}.`);
};

module.exports = {
	'deleteCallback': (req, res, table) => {
		const FOREIGN_KEY_VIOLATION = '23503';

		buildQuery('DELETE', table, req.params, req.query)
			.then(() => res.status(Status.OK)
				.send('DELETE operation succeeded.'))
			.catch((err) => {
				if (err.code === FOREIGN_KEY_VIOLATION) {
					sendForeignKeyError(res, err);
				} else {
					sendError(res, 'DELETE')(err);
				}
			});
	},

	'getCallback': (req, res, table) => {
		buildQuery('SELECT', table, req.params, req.query)
			.then((result) => res.status(Status.OK).send(result.rows))
			.catch(sendError(res, 'GET'));
	},

	'postCallback': (req, res, table) => {
		const values = Object.values(req.body);
		const keys = Object.keys(req.body).join(', ');
		const placeholders = values
			.map((key, i) => `$${i + 1}`)
			.join(', ');

		if (values === '') {
			res.status(Status.BAD_REQUEST)
				.send('Please supply a value.');
		} else {
			dbPool.query(
				`INSERT INTO ${table} (${keys}) VALUES (${placeholders})`,
				values
			)
				.then(() => res.status(Status.OK)
					.send('POST operation succeeded.'))
				.catch(sendError(res, 'POST'));
		}
	}
};