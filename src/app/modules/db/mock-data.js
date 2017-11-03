const client = require('./client');

module.exports = () => {
    return client.query(`INSERT INTO makes (name) VALUES ('Audi'), ('BMW'), ('Ferrari'), ('Ford'),
        ('Harley Davidson'), ('Honda'), ('Hyundai'), ('Lamborghini'), ('Mercedes-Benz'), ('Mini'), ('Nissan'),
        ('Opel'), ('Porsche'), ('Tesla'), ('Toyota'), ('Volkswagen')`
    ).then(() => client.query(`INSERT INTO colors (name) VALUES ('black'), ('gray'), ('silver'), ('white'), ('blue'),
        ('red'), ('green'), ('pink'), ('purple'), ('brown'), ('orange'), ('yellow')`
    )).then(() => client.query(`INSERT INTO types (name) VALUES ('Car'), ('Truck'), ('Motorcycle')`
    )).then(() => client.query(`INSERT INTO models (name, makeid, typeid, maximumcargoload) VALUES
        ('Model T', 4, 1, NULL), ('Beetle', 16, 1, NULL), ('Corolla', 15, 1, NULL), ('Falcon', 4, 1, NULL),
        ('Gol', 16, 1, NULL), ('Santana', 16, 1, NULL), ('Golf', 16, 1, NULL), ('E-650', 4, 2, 11793),
        ('F-750', 4, 2, 14969), ('Tacoma Limited', 15, 2, 508)`
    )).then(() => client.query(`INSERT INTO customers (firstname, lastname, postalcode, address, city, phonenumber,
        customersince) VALUES
        ('James', 'Butt', '70116', '6649 N Blue Gum St', 'New Orleans', '504-621-8927', '1999-01-08'),
        ('Josephine', 'Darakjy', '48116', '4 B Blue Ridge Blvd', 'Brighton', '810-292-9388', '2003-03-25'),
        ('Art', 'Venere', '08014', '8 W Cerritos Ave #54', 'Bridgeport', '856-636-8749', '2004-12-11'),
        ('Lenna', 'Paprocki', '99501', '639 Main St', 'Anchorage', '907-385-4412', '1998-05-05')`
    )).then(() => client.query(`INSERT INTO vehicles (modelid, colorid, licenseplate, year, mileage,
        milessincemaintenance, available) VALUES
        (2, 4, '2FAST4U', 1996, 25000, 3000, true), (1, 1, 'KID 507', 2004, 23999, 4539, false),
        (5, 1, 'ADD 09', 2009, 1521, 1521, true), (8, 7, 'SDU-582', 2000, 27003, 19000, true),
        (10, 5, 'DSU-285', 2014, 52021, 14999, true)`
    )).then(() => client.query(`INSERT INTO rentals (customerid, vehicleid, rentedsince) VALUES
        (1, 3, '2017-05-11'), (3, 4, '2017-09-22'), (4, 5, '2017-11-01')`
    )).catch((err) => console.error(err.stack));
};