const app = require('express')();
const dbClient = require('./db-init');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

HTTP = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
};

function newRoute(httpVerb, route, columns) {
    const table = route.split('/')[1];
    const dbColumns = columns ? columns.join(', ') : '*';

    switch (httpVerb) {
        case HTTP.GET:
            app.get(route, function (req, res) {

                if (Object.keys(req.params).length > 0) {
                    const key = Object.keys(req.params)[0];
                    const value = Object.values(req.params)[0];

                    res.send(dbClient.query(`SELECT ${dbColumns} FROM ${table} WHERE ${key}=${value}`).rows);
                } else {
                    res.send(dbClient.query(`SELECT ${dbColumns} FROM ${table}`).rows);
                }
            });
            break;
        case HTTP.POST:
            app.post(route, function (req, res) {
                const values = Object.values(req.body)
                    .map(value => typeof value === 'string' && value !== '' ? `'${value}'` : value)
                    .join(', ');

                if (!columns) {
                    res.send('Please supply the columns to fill.');
                } else if (values === '') {
                    res.send('Please supply a value.');
                }
                else {
                    dbClient.query(`INSERT INTO ${table} (${dbColumns})
                        VALUES (${values})
                    `)
                        .then(() => res.send('Operation succeeded.'))
                        .catch(() => res.send('Operation failed.'));
                }
            });
            break;
    }
}

newRoute(HTTP.GET, '/vehicles');
newRoute(HTTP.GET, '/vehicles/:vehicleId');
newRoute(HTTP.GET, '/customers');
newRoute(HTTP.GET, '/customers/:customerId');
newRoute(HTTP.GET, '/rentals');
newRoute(HTTP.GET, '/rentals/:vehicleId');
newRoute(HTTP.GET, '/rentals/:customerId');
newRoute(HTTP.GET, '/colors');
newRoute(HTTP.GET, '/colors/:colorId');
newRoute(HTTP.GET, '/makes');
newRoute(HTTP.GET, '/makes/:makeId');
newRoute(HTTP.GET, '/models');
newRoute(HTTP.GET, '/models/:modelId');

// Sample Curl: curl --data "MakeID=0&ModelID=0&ColorID=0&LicensePlate='FooBar'&Year=1996&Mileage=555&MilesSinceMaintenance=1200&MaximumCargoLoad=50&Available=True" -X POST localhost:8080/vehicles

newRoute(HTTP.POST, '/vehicles', ['MakeID', 'ModelID', 'ColorID', 'LicensePlate', 'Year', 'Mileage',
    'MilesSinceMaintenance', 'MaximumCargoLoad', 'Available']);

// Sample Curl: curl --data "Name=Toyota" -X POST localhost:8080/makes

newRoute(HTTP.POST, '/makes', ['Name']);

module.exports = app;