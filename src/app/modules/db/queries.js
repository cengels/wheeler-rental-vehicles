const client = require('./initialize');

module.exports = {
    get: {
        all: {
            vehicles: () => {
                return client.query('SELECT * FROM Vehicles');
            },

            availableVehicles: () => {
                return client.query(`
                    SELECT VehicleID, LicensePlate FROM Vehicles WHERE Available=TRUE AND NOT EXISTS
                        (SELECT 1 FROM Rentals WHERE VehicleID=Vehicles.VehicleID)
                `);
            },

            customers: () => {
                return client.query('SELECT CustomerID, FirstName, LastName FROM Customers');
            },
        },

        only: {
            vehicle: (id) => {
                return client.query(`SELECT * FROM Vehicles WHERE VehicleID=${id}`);
            },

            type: (id) => {
                if (typeof id === 'string') {
                    return client.query(`SELECT TypeID FROM types WHERE Name=${id}`);
                } else {
                    return client.query(`SELECT Name FROM types WHERE TypeID=${id}`);
                }
            },

            model: (id) => {
                if (typeof id === 'string') {
                    return client.query(`SELECT * FROM models WHERE Name=${id}`);
                } else {
                    return client.query(`SELECT * FROM models WHERE ModelID=${id}`);
                }
            }
        },
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