const winston = require('winston');
const moment = require('moment');
const config = require('../../../config');

const pyFormat = winston.format.printf(info => {
	const vars = info.parameters
		? `  ${info.parameters}`
		: '';
	const timestamp = moment(info.timestamp)
		.format('YYYY-MM-DD hh:mm:ss');
	// eslint-disable-next-line max-len
	return `${timestamp}  [${info.filename}]  ${info.level.toUpperCase()}:  ${info.message}${vars}`;
});

const logger = winston.createLogger({
	'format': winston.format.combine(
		winston.format.timestamp(),
		pyFormat
	),
	'level': 'info',
	'levels': {
		/* eslint-disable */
		'critical': 0,
		'serverError': 1,
		'userError': 2,
		'warn': 3,
		'info': 4,
		'debug': 5,
		'error': 6
		/* eslint-enable */
	},

	/*
	 * Log files do not need to exist, but the directory
	 * *must exist*, else winston will not log to file
	 */
	'transports': [
		new winston.transports.File({
			'filename': config.get('log:file_winston'),
			'maxsize': 1000
		})
	]
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console());
}

module.exports = (fullPath) => {
	const levels = Object.keys(logger.levels);
	const filePathArray = fullPath.split('/');
	const filename = filePathArray[filePathArray.length - 1];

	// eslint-disable-next-line
	return levels.reduce((obj, key) => ({ ...obj, [key]: (msg, ...params) => {
		let parameters = [];

		switch (params.constructor) {
			case Object:
				parameters = JSON.stringify(params);
				break;
			case Array:
				parameters = params.map(item => {
					if (
						typeof item === 'object'
						&& item.constructor !== Array
					) {
						return JSON.stringify(item);
					}

					return item;
				}).join(', ');
				break;
			default:
				// Do nothing
		}

		return logger[key]({
			filename,
			'message': msg,
			parameters
		});
		// eslint-disable-next-line
	} }), {});
};