const client = require('./initialize');

module.exports = {
    get: {
        availableVehicles: () => {
            return client.query(`
                SELECT VehicleID, LicensePlate FROM Vehicles WHERE Available=TRUE AND NOT EXISTS
                    (SELECT 1 FROM Rentals WHERE VehicleID=Vehicles.VehicleID)
            `)._result.rows;
        },

        allCustomers: () => {
            return client.query('SELECT CustomerID, FirstName, LastName FROM Customers')._result.rows;
        }
    },

    post: {
        newRental: (customerId, vehicleId, rentedSince) => {
            return client.query(`
                INSERT INTO Rentals (CustomerID, VehicleID, RentedSince)
                    VALUES (${customerId}, ${vehicleId}, '${rentedSince}')
            `);
        }
    }
};