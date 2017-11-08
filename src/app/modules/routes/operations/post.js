const dbClient = require('../../db/initialize');

module.exports = (req, res, table) => {
    const values = Object.values(req.body)
        .map(value => typeof value === 'string' && value !== '' ? `'${value}'` : value)
        .join(', ');
    const keys = Object.keys(req.body)
        .join(', ');

    if (values === '') {
        res.send('Please supply a value.');
    } else {
        dbClient.query(`INSERT INTO ${table} (${keys})
                    VALUES (${values})
                `)
            .then(() => res.send('POST operation succeeded.'))
            .catch((err) => res.send('POST operation failed.' + err.stack));
    }
};