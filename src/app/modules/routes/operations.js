const dbPool = require('../db/pool');
const logger = require('../Logger')(module.id);
const Status = require('../../definitions/status');

const getWhereConditions = (params, query) => {
	if (Object.keys(params).length > 0 || Object.keys(query).length > 0) {
		const keys = Object.keys(params).concat(Object.keys(query));
		const values = Object.values(params).concat(Object.values(query));
		return 'WHERE ' + keys.map((key, i) => `${key} = ${values[i]}`).join(' AND ');
	}

	return '';
};

module.exports = {
	getCallback: (req, res, table) => {
		const whereConditions = getWhereConditions(req.params, req.query);

		dbPool.query(`SELECT * FROM ${table} ${whereConditions}`)
			.then((result) => res.status(Status.OK).send(result.rows))
			.catch((err) => {
				logger.serverError('GET operation failed.', err.detail);
				res.status(Status.INTERNAL_SERVER_ERROR).send('GET operation failed. ' + err.detail);
			});
	},

	postCallback: (req, res, table) => {
		const values = Object.values(req.body)
			.map(value => typeof value === 'string' && value !== '' ? `'${value}'` : value)
			.join(', ');
		const keys = Object.keys(req.body)
			.join(', ');

		if (values === '') {
			res.status(Status.BAD_REQUEST).send('Please supply a value.');
		} else {
			dbPool.query(`INSERT INTO ${table} (${keys})
					VALUES (${values})
				`)
				.then(() => res.status(Status.OK).send('POST operation succeeded.'))
				.catch((err) => {
					logger.serverError('POST operation failed.', err.detail);
					res.status(Status.INTERNAL_SERVER_ERROR).send('POST operation failed. ' + err.detail);
				});
		}
	},

	deleteCallback: (req, res, table) => {
		const whereConditions = getWhereConditions(req.params, req.query);

		dbPool.query(`DELETE FROM ${table} ${whereConditions}`)
			.then(() => res.status(Status.OK).send('DELETE operation succeeded.'))
			.catch((err) => {
				if (err.code === '23503') {
					const match = err.detail.match(/^Key \(([A-z]+)\)=\((\d)\)/);
					logger.userError(err.detail);
					res.status(Status.BAD_REQUEST).send(`DELETE operation failed. ${match[1]} ${match[2]} is still in use by table ${err.table}.`);
				} else {
					logger.serverError('DELETE operation failed.', err.detail);
					res.status(Status.INTERNAL_SERVER_ERROR).send('DELETE operation failed. ' + err.detail);
				}
			});
	}
};