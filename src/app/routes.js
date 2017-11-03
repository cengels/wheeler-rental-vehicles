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

function newStandardRoute(httpVerb, route, columns) {
    const table = route.split('/')[1];
    const dbColumns = columns ? columns.join(', ') : '*';

    switch (httpVerb) {
        case HTTP.GET:
            router.get(route, function (req, res) {
                let whereConditions;

                if (Object.keys(req.params).length > 0 || Object.keys(req.query).length > 0) {
                    const keys = Object.keys(req.params).concat(Object.keys(req.query));
                    const values = Object.values(req.params).concat(Object.values(req.query));
                    whereConditions = 'WHERE ' + keys.map((key, i) => `${key} = ${values[i]}`).join(' AND ');
                }

                dbClient.query(`SELECT ${dbColumns} FROM ${table} ${whereConditions}`, (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(result.rows);
                    }
                });
            });
            break;
        case HTTP.POST:
            router.post(route, function (req, res) {
                const values = Object.values(req.body)
                    .map(value => typeof value === 'string' && value !== '' ? `'${value}'` : value)
                    .join(', ');
                const keys = Object.keys(req.body)
                    .join(', ');

                if (!columns) {
                    res.send('Please supply the columns to fill.');
                } else if (values === '') {
                    res.send('Please supply a value.');
                }
                else {
                    dbClient.query(`INSERT INTO ${table} (${keys})
                        VALUES (${values})
                    `)
                        .then(() => res.send('Operation succeeded.'))
                        .catch((err) => res.send('Operation failed.' + err.stack));
                }
            });
            break;
    }
}

newStandardRoute(HTTP.GET, '/vehicles');
newStandardRoute(HTTP.GET, '/vehicles/:vehicleId');
newStandardRoute(HTTP.GET, '/customers');
newStandardRoute(HTTP.GET, '/customers/:customerId');
newStandardRoute(HTTP.GET, '/rentals');
newStandardRoute(HTTP.GET, '/rentals/:customerId/:vehicleId');
newStandardRoute(HTTP.GET, '/colors');
newStandardRoute(HTTP.GET, '/colors/:colorId');
newStandardRoute(HTTP.GET, '/types');
newStandardRoute(HTTP.GET, '/types/:typeId');
newStandardRoute(HTTP.GET, '/makes');
newStandardRoute(HTTP.GET, '/makes/:makeId');
newStandardRoute(HTTP.GET, '/models');
newStandardRoute(HTTP.GET, '/models/:modelId');

// Sample Curl: curl --data "MakeID=0&ModelID=0&ColorID=0&LicensePlate='FooBar'&Year=1996&Mileage=555&MilesSinceMaintenance=1200&MaximumCargoLoad=50&Available=True" -X POST localhost:8080/vehicles
// Sample Curl: curl --data "Name=Toyota" -X POST localhost:8080/makes

newStandardRoute(HTTP.POST, '/vehicles', ['MakeID', 'ModelID', 'ColorID', 'LicensePlate', 'Year', 'Mileage',
    'MilesSinceMaintenance', 'MaximumCargoLoad', 'Available']);
newStandardRoute(HTTP.POST, '/customers', ['FirstName', 'LastName', 'PostalCode', 'Address', 'City', 'PhoneNumber',
    'CustomerSince']);
newStandardRoute(HTTP.POST, '/rentals', ['CustomerID', 'VehicleID', 'RentedSince']);
newStandardRoute(HTTP.POST, '/colors', ['Name']);
newStandardRoute(HTTP.POST, '/types', ['Name']);
newStandardRoute(HTTP.POST, '/makes', ['Name']);
newStandardRoute(HTTP.POST, '/models', ['Name', 'MakeID', 'TypeID', 'MaximumCargoLoad']);

module.exports = router;