const logger = require('../Logger')(module.id);

module.exports = (client) => {
    return client.query(`
            CREATE TABLE IF NOT EXISTS Customers(
                CustomerID SERIAL PRIMARY KEY,
                FirstName VARCHAR(255) NOT NULL,
                LastName VARCHAR(255) NOT NULL,
                PostalCode VARCHAR(255) NOT NULL,
                Address VARCHAR(255) NOT NULL,
                City VARCHAR(255) NOT NULL,
                PhoneNumber VARCHAR(255),
                CustomerSince DATE
            )
        `).then(() => client.query(`
            CREATE TABLE IF NOT EXISTS Rentals(
                CustomerID INTEGER,
                VehicleID INTEGER,
                RentedSince DATE NOT NULL,
                PRIMARY KEY (CustomerID, VehicleID)
            )
        `)).then(() => client.query(`
            CREATE TABLE IF NOT EXISTS Types(
                TypeID SERIAL PRIMARY KEY,
                Name VARCHAR(255) NOT NULL
            )
        `)).then(() => client.query(`
            CREATE TABLE IF NOT EXISTS Makes(
                MakeID SERIAL PRIMARY KEY,
                Name VARCHAR(255) NOT NULL
            )
        `)).then(() => client.query(`
            CREATE TABLE IF NOT EXISTS Models(
                ModelID SERIAL PRIMARY KEY,
                Name VARCHAR(255) NOT NULL,
                MakeID INTEGER REFERENCES Makes(MakeID),
                TypeID INTEGER REFERENCES Types(TypeID),
                MaximumCargoLoad INTEGER
            )
        `)).then(() => client.query(`
            CREATE TABLE IF NOT EXISTS Colors(
                ColorID SERIAL PRIMARY KEY,
                Name VARCHAR(255) NOT NULL
            )
        `)).then(() => client.query(`
            CREATE TABLE IF NOT EXISTS Vehicles(
                VehicleID SERIAL PRIMARY KEY,
                ModelID INTEGER REFERENCES Models(ModelID),
                ColorID  INTEGER REFERENCES Colors(ColorID),
                LicensePlate VARCHAR(255) NOT NULL,
                Year INTEGER NOT NULL,
                Mileage INTEGER NOT NULL,
                MilesSinceMaintenance INTEGER NOT NULL,
                Available BOOLEAN NOT NULL DEFAULT TRUE
            )
        `)).then(() => logger.info('Created (missing) tables.'))
        .catch(err => logger.serverError('Error creating default tables.', err.stack));
};