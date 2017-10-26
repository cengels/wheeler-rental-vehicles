const pg = require('pg');
const config = require('./config');

const client = new pg.Client({
    user: config.dev.db.user,
    host: config.dev.db.host,
    database: 'rentaldb',
    password: config.dev.db.password,
    port: config.dev.db.port,
});

client.connect((err) => {
    if (err) {
        console.error(err.stack);
    } else {
        client.query(`
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
            CREATE TABLE IF NOT EXISTS Makes(
                MakeID SERIAL PRIMARY KEY,
                Name VARCHAR(255) NOT NULL
            )
        `)).then(() => client.query(`
            CREATE TABLE IF NOT EXISTS Models(
                ModelID SERIAL PRIMARY KEY,
                Name VARCHAR(255) NOT NULL
            )
        `)).then(() => client.query(`
            CREATE TABLE IF NOT EXISTS Colors(
                ColorID SERIAL PRIMARY KEY,
                Name VARCHAR(255) NOT NULL
            )
        `)).then(() => client.query(`
            CREATE TABLE IF NOT EXISTS Vehicles(
                VehicleID SERIAL PRIMARY KEY,
                MakeID INTEGER REFERENCES Makes(MakeID),
                ModelID INTEGER REFERENCES Models(ModelID),
                ColorID  INTEGER REFERENCES Colors(ColorID),
                LicensePlate VARCHAR(255) NOT NULL,
                Year INTEGER NOT NULL,
                Mileage INTEGER NOT NULL,
                MilesSinceMaintenance INTEGER NOT NULL,
                MaximumCargoLoad INTEGER,
                Available BOOLEAN NOT NULL DEFAULT TRUE
            )
        `)).then(() => {
            client.end();
        }).catch(err => {
            console.error(err);
            client.end();
        });
    }
});