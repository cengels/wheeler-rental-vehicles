const config = require('nconf');
const environment = process.env.NODE_ENV || 'development';

const defaults = {
	"log" : {
		"file_winston" : "../logs/winston.log",
		"file_uncaught" : "../logs/uncaught.log"
	},
	"db": {
		"database": "rentaldb",
		"host": "localhost",
		"port": 5432
	}
};

const environmentOptions = {
	whitelist: ['HOST', 'PORT', 'FILE_WINSTON', 'FILE_UNCAUGHT', 'DB', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT'],
	parseValues: true
};

config.argv()
	.env(environmentOptions)
	.file({ file: `${__dirname}/${environment}.json` })
	.defaults(defaults);

module.exports = config;