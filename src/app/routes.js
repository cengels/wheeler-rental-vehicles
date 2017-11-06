const router = require('express')();
const dbClient = require('./modules/db/initialize');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

HTTP = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

function newStandardRoute(route, ...httpVerbs) {
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
}

function getWhereConditions(params, query) {
    if (Object.keys(params).length > 0 || Object.keys(query).length > 0) {
        const keys = Object.keys(params).concat(Object.keys(query));
        const values = Object.values(params).concat(Object.values(query));
        return 'WHERE ' + keys.map((key, i) => `${key} = ${values[i]}`).join(' AND ');
    }

    return '';
}

newStandardRoute('/vehicles', HTTP.GET, HTTP.POST);
newStandardRoute('/vehicles/:vehicleId', HTTP.GET);
newStandardRoute('/customers', HTTP.GET, HTTP.POST);
newStandardRoute('/customers/:customerId', HTTP.GET);
newStandardRoute('/rentals', HTTP.GET, HTTP.POST);
newStandardRoute('/rentals/:customerId/:vehicleId', HTTP.GET);
newStandardRoute('/colors', HTTP.GET, HTTP.POST);
newStandardRoute('/colors/:colorId', HTTP.GET);
newStandardRoute('/types', HTTP.GET, HTTP.POST);
newStandardRoute('/types/:typeId', HTTP.GET);
newStandardRoute('/makes', HTTP.GET, HTTP.POST);
newStandardRoute('/makes/:makeId', HTTP.GET);
newStandardRoute('/models', HTTP.GET, HTTP.POST);
newStandardRoute('/models/:modelId', HTTP.GET);

module.exports = router;