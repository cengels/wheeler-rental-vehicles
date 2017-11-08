const client = require('./initialize');

module.exports = {
    get: {
        allVehicles: () => {
            return client.query('SELECT * FROM vehicles')._result.rows;
        },

        allCustomers: () => {
            return client.query('SELECT * FROM customers')._result.rows;
        }
    },

    post: {
        newRental: (customerId, vehicleId, rentedSince) => {
            return client.query(
                `INSERT INTO rentals (customerid, vehicleid, rentedsince)
                VALUES (${customerId}, ${vehicleId}, '${rentedSince}')`
            );
        }
    }
};