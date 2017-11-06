const createTables = require('./create-tables');
const insertMockData = require('./fill-tables-mock');

module.exports = (client) => {
    client.query('DROP SCHEMA IF EXISTS public CASCADE')
        .then(() => client.query('CREATE SCHEMA IF NOT EXISTS public'))
        .then(() => client.query('GRANT ALL ON SCHEMA public TO public'))
        .then(() => client.query('GRANT ALL ON SCHEMA public TO postgres'))
        .then(() => createTables(client))
        .then(() => insertMockData(client))
        .catch((err) => console.error(err.stack));
};