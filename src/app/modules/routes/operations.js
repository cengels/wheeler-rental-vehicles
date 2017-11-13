const dbPool = require('../db/pool');
const logger = require('../Logger');

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
			.then((result) => res.send(result.rows))
			.catch((err) => {
				logger.serverError('GET operation failed.', err);
				res.send('GET operation failed.', err);
			});
	},

	postCallback: (req, res, table) => {
		const values = Object.values(req.body)
			.map(value => typeof value === 'string' && value !== '' ? `'${value}'` : value)
			.join(', ');
		const keys = Object.keys(req.body)
			.join(', ');

		if (values === '') {
			res.send('Please supply a value.');
		} else {
			dbPool.query(`INSERT INTO ${table} (${keys})
					VALUES (${values})
				`)
				.then(() => res.send('POST operation succeeded.'))
				.catch((err) => {
					logger.serverError('POST operation failed.', err);
					res.send('POST operation failed.', err);
				});
		}
	},

	deleteCallback: (req, res, table) => {
		const whereConditions = getWhereConditions(req.params, req.query);

		dbPool.query(`DELETE FROM ${table} ${whereConditions}`)
			.then(() => res.send('DELETE operation succeeded.'))
			.catch((err) => {
				logger.serverError('DELETE operation failed.', err);
				res.send('DELETE operation failed.', err);
			});
	}
};