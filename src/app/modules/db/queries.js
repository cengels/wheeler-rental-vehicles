module.exports = {
    getAll: {
        vehicles: (client) => {
            return client.query('SELECT * FROM Vehicles');
        },

        availableVehicles: (client) => {
            return client.query(`
                    SELECT VehicleID, LicensePlate FROM Vehicles WHERE Available=TRUE AND NOT EXISTS
                        (SELECT 1 FROM Rentals WHERE VehicleID=Vehicles.VehicleID)
                `);
        },

        customers: (client) => {
            return client.query('SELECT CustomerID, FirstName, LastName FROM Customers');
        },
    },

    getOnly: {
        vehicle: (client, id) => {
            return client.query(`SELECT * FROM Vehicles WHERE VehicleID=${id}`);
        },

        type: (client, id) => {
            if (typeof id === 'string') {
                return client.query(`SELECT TypeID FROM types WHERE Name=${id}`);
            } else {
                return client.query(`SELECT Name FROM types WHERE TypeID=${id}`);
            }
        },

        model: (client, id) => {
            if (typeof id === 'string') {
                return client.query(`SELECT * FROM models WHERE Name=${id}`);
            } else {
                return client.query(`SELECT * FROM models WHERE ModelID=${id}`);
            }
        }
    },

    post: {
        newRental: (client, customerId, vehicleId, rentedSince) => {
            return client.query(`
                INSERT INTO Rentals (CustomerID, VehicleID, RentedSince)
                    VALUES (${customerId}, ${vehicleId}, '${rentedSince}')
            `);
        }
    }
};