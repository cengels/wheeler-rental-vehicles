const client = require('./client');
const createTables = require('./create-tables');
const restoreMockData = require('./restore-mock-data');

const environment = 'dev';  // TODO: This thing should come from an environment variable/the start scripts

client.connect((err) => {
    if (err) {
        console.error(err.stack);
    } else {
        if (environment === 'dev') {
            restoreMockData(client);
        } else {
            createTables(client);
        }
    }
});

module.exports = client;