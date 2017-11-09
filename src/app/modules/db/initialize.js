const client = require('./client');
const createTables = require('./create-tables');
const restoreMockData = require('./restore-mock-data');
const logger = require('../Logger')(module.id);

client.connect((err) => {
    if (err) {
        logger.serverError('Error connecting to database.', err);
    } else {
        if (process.env.NODE_ENV === 'development') {
            restoreMockData(client);
        } else {
            createTables(client);
        }
    }
});

module.exports = client;