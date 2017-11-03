const client = require('./modules/db/client');
const createTables = require('./modules/db/initialize');

const environment = 'dev';  // TODO: This thing should come from an environment variable/the start scripts

client.connect((err) => {
    if (err) {
        console.error(err.stack);
    } else {
        if (environment === 'dev') {
            client.query('DROP SCHEMA public CASCADE')
                .then(() => client.query('CREATE SCHEMA public'))
                .then(() => client.query('GRANT ALL ON SCHEMA public TO public'))
                .then(() => client.query('GRANT ALL ON SCHEMA public TO postgres'))
                .then(createTables)
                .catch((err) => console.error(err.stack));
        } else {
            createTables();
        }
    }
});

module.exports = client;