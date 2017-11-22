const winston = require('winston');
const moment = require('moment');
const config = require('../../../config');

const pyFormat = winston.format.printf(info => {
	const vars = info.parameters ? `  ${info.parameters}` : '';
	const timestamp = moment(info.timestamp).format('YYYY-MM-DD hh:mm:ss');
	return `${timestamp}  [${info.filename}]  ${info.level.toUpperCase()}:  ${info.message}${vars}`;
});

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp(),
		pyFormat
	),
	levels: {
		critical: 0,
		serverError: 1,
		userError: 2,
		warn: 3,
		info: 4,
		debug: 5,
		error: 6
	},

	// log files do not need to exist, but the directory *must exist*, else winston will not log to file
	transports: [
		new winston.transports.File({ filename: config.get('log:file_winston'), maxsize: 1000 })
	]
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console());
}

module.exports = (filename) => {
	const levels = Object.keys(logger.levels);
	filename = filename.split('/');
	filename = filename[filename.length - 1];

	return levels.reduce((o, key) => ({ ...o, [key]: (msg, ...vars) => {
		switch (vars.constructor) {
			case Object:
				vars = JSON.stringify(vars);
				break;
			case Array:
				vars = vars.map(item => {
					if (typeof item === 'object' && item.constructor !== Array) {
						return JSON.stringify(item);
					} else {
						return item;
					}
				}).join(', ');
				break;
			default:
				// Do nothing
		}

		return logger[key]({
			filename: filename,
			message: msg,
			parameters: vars
		});
	}}), {});
};