const HTTP = require('../definitions/http-verbs');
const dbClient = require('./db/initialize');

function getWhereConditions(params, query) {
    if (Object.keys(params).length > 0 || Object.keys(query).length > 0) {
        const keys = Object.keys(params).concat(Object.keys(query));
        const values = Object.values(params).concat(Object.values(query));
        return 'WHERE ' + keys.map((key, i) => `${key} = ${values[i]}`).join(' AND ');
    }

    return '';
}

module.exports = (router) => (route, ...httpVerbs) => {
    const table = route.split('/')[1];

    if (httpVerbs.indexOf(HTTP.GET) >= 0) {
        router.get(route, function (req, res) {
            const whereConditions = getWhereConditions(req.params, req.query);

            dbClient.query(`SELECT * FROM ${table} ${whereConditions}`, (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(result.rows);
                }
            });
        });
    }

    if (httpVerbs.indexOf(HTTP.POST) >= 0) {
        router.post(route, function (req, res) {
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
        });
    }

    if (httpVerbs.indexOf(HTTP.DELETE) >= 0) {
        router.delete(route, function (req, res) {
            const whereConditions = getWhereConditions(req.params, req.query);

            dbClient.query(`DELETE FROM ${table} ${whereConditions}`)
                .then(() => res.send('DELETE operation succeeded.'))
                .catch((err) => res.send('DELETE operation failed.' + err.stack));
        });
    }
};