const createTables = require('./create-tables');
const insertMockData = require('./fill-tables-mock');
const logger = require('../Logger')(module.id);

module.exports = (client) => {
    return client.query('DROP SCHEMA IF EXISTS public CASCADE')
        .then(() => client.query('CREATE SCHEMA IF NOT EXISTS public'))
        .then(() => client.query('GRANT ALL ON SCHEMA public TO public'))
        .then(() => client.query('GRANT ALL ON SCHEMA public TO postgres'))
        .then(() => logger.info('Dropped and recreated schema.'))
        .then(() => createTables(client))
        .then(() => insertMockData(client))
        .catch((err) => logger.serverError('Error restoring mock data.', err.stack));
};