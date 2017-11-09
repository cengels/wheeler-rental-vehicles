const client = require('./client');
const createTables = require('./create-tables');
const restoreMockData = require('./restore-mock-data');
const logger = require('../Logger');

const environment = 'dev';  // TODO: This thing should come from an environment variable/the start scripts

client.connect((err) => {
    if (err) {
        logger.serverError('Error connecting to database.', err);
    } else {
        if (environment === 'dev') {
            restoreMockData(client);
        } else {
            createTables(client);
        }
    }
});

module.exports = client;