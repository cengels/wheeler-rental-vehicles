const http = require('http');

const setMethod = (method) => (path) => {
    return {
        port: 8080,
        host: 'localhost',
        method: method,
        path: path,
        headers: {
            "Content-Type": "application/json"
        }
    }
};

const parseResponse = (res, callback) => {
    let body = [];
    res.on('data', data => { body.push(data.toString()) } );

    res.on('end', () => {
        try {
            body = JSON.parse(body);
        } catch (e) {
            // JUST USE THE UNCHANGED body
        }
        callback(body);
    });
};

describe('Integration Tests', () => {
    describe('GET Tests', () => {
        const getOptions = setMethod('GET');

        it('GET: all colors', () => {
            http.get(getOptions('/colors'), res => parseResponse(res, (body) => {
                expect(body).toEqual([
                    {"colorid":1,"name":"black"}, {"colorid":2,"name":"gray"},{"colorid":3,"name":"silver"},
                    {"colorid":4,"name":"white"},{"colorid":5,"name":"blue"},{"colorid":6,"name":"red"},
                    {"colorid":7,"name":"green"},{"colorid":8,"name":"pink"},{"colorid":9,"name":"purple"},
                    {"colorid":10,"name":"brown"},{"colorid":11,"name":"orange"},{"colorid":12,"name":"yellow"}
                ]);
            }))
        });
        it('GET: single color', () => {
            http.get(getOptions('/colors/5'), res => parseResponse(res, (body) => {
                expect(body).toEqual([ { "colorid":5,"name":"blue" } ]);
            }))
        });
        it('GET: all makes', () => {
            http.get(getOptions('/makes'), res => parseResponse(res, (body) => {
                expect(body).toEqual([
                    {"makeid":1,"name":"Audi"}, {"makeid":2,"name":"BMW"}, {"makeid":3,"name":"Ferrari"},
                    {"makeid":4,"name":"Ford"}, {"makeid":5,"name":"Harley Davidson"}, {"makeid":6,"name":"Honda"},
                    {"makeid":7,"name":"Hyundai"}, {"makeid":8,"name":"Lamborghini"},
                    {"makeid":9,"name":"Mercedes-Benz"}, {"makeid":10,"name":"Mini"}, {"makeid":11,"name":"Nissan"},
                    {"makeid":12,"name":"Opel"}, {"makeid":13,"name":"Porsche"}, {"makeid":14,"name":"Tesla"},
                    {"makeid":15,"name":"Toyota"},{"makeid":16,"name":"Volkswagen"}]);
            }))
        });
        it('GET: single make', () => {
            http.get(getOptions('/makes/3'), res => parseResponse(res, (body) => {
                expect(body).toEqual([ { "makeid":3,"name":"Ferrari" } ]);
            }))
        });
        it('GET: all types', () => {
            http.get(getOptions('/types'), res => parseResponse(res, (body) => {
                expect(body).toEqual([
                    {"typeid":1,"name":"Car"}, {"typeid":2,"name":"Truck"}, {"typeid":3,"name":"Motorcycle"}
                ]);
            }))
        });
        it('GET: single type', () => {
            http.get(getOptions('/types/2'), res => parseResponse(res, (body) => {
                expect(body).toEqual([ { "typeid":2,"name":"Truck" } ]);
            }))
        });
        it('GET: all models', () => {
            http.get(getOptions('/models'), res => parseResponse(res, (body) => {
                expect(body).toEqual([
                    {"modelid":1,"name":"Model T","makeid":4,"typeid":1,"maximumcargoload":null},
                    {"modelid":2,"name":"Beetle","makeid":16,"typeid":1,"maximumcargoload":null},
                    {"modelid":3,"name":"Corolla","makeid":15,"typeid":1,"maximumcargoload":null},
                    {"modelid":4,"name":"Falcon","makeid":4,"typeid":1,"maximumcargoload":null},
                    {"modelid":5,"name":"Gol","makeid":16,"typeid":1,"maximumcargoload":null},
                    {"modelid":6,"name":"Santana","makeid":16,"typeid":1,"maximumcargoload":null},
                    {"modelid":7,"name":"Golf","makeid":16,"typeid":1,"maximumcargoload":null},
                    {"modelid":8,"name":"E-650","makeid":4,"typeid":2,"maximumcargoload":11793},
                    {"modelid":9,"name":"F-750","makeid":4,"typeid":2,"maximumcargoload":14969},
                    {"modelid":10,"name":"Tacoma Limited","makeid":15,"typeid":2,"maximumcargoload":508}
                ]);
            }))
        });
        it('GET: single model', () => {
            http.get(getOptions('/models/4'), res => parseResponse(res, (body) => {
                expect(body).toEqual([ { "modelid":4,"name":"Falcon","makeid":4,"typeid":1,"maximumcargoload":null } ]);
            }))
        });
        it('GET: all customers', () => {
            http.get(getOptions('/customers'), res => parseResponse(res, (body) => {
                expect(body).toEqual([
                    {"customerid":1,"firstname":"James","lastname":"Butt","postalcode":"70116",
                        "address":"6649 N Blue Gum St","city":"New Orleans","phonenumber":"504-621-8927",
                        "customersince":"1999-01-07T23:00:00.000Z"},
                    {"customerid":2,"firstname":"Josephine","lastname":"Darakjy","postalcode":"48116",
                        "address":"4 B Blue Ridge Blvd","city":"Brighton","phonenumber":"810-292-9388",
                        "customersince":"2003-03-24T23:00:00.000Z"},
                    {"customerid":3,"firstname":"Art","lastname":"Venere","postalcode":"08014",
                        "address":"8 W Cerritos Ave #54","city":"Bridgeport","phonenumber":"856-636-8749",
                        "customersince":"2004-12-10T23:00:00.000Z"},
                    {"customerid":4,"firstname":"Lenna","lastname":"Paprocki","postalcode":"99501",
                        "address":"639 Main St","city":"Anchorage","phonenumber":"907-385-4412",
                        "customersince":"1998-05-04T22:00:00.000Z"}
                ]);
            }))
        });
        it('GET: single customer', () => {
            http.get(getOptions('/customers/3'), res => parseResponse(res, (body) => {
                expect(body).toEqual([ { "customerid":3,"firstname":"Art","lastname":"Venere","postalcode":"08014",
                    "address":"8 W Cerritos Ave #54","city":"Bridgeport","phonenumber":"856-636-8749",
                    "customersince":"2004-12-10T23:00:00.000Z" } ]);
            }))
        });
        it('GET: all vehicles', () => {
            http.get(getOptions('/vehicles'), res => parseResponse(res, (body) => {
                expect(body).toEqual([
                    {"vehicleid":1,"modelid":2,"colorid":4,"licenseplate":"2FAST4U","year":1996,"mileage":25000,
                        "milessincemaintenance":3000,"available":true},
                    {"vehicleid":2,"modelid":1,"colorid":1,"licenseplate":"KID 507","year":2004,"mileage":23999,
                        "milessincemaintenance":4539,"available":false},
                    {"vehicleid":3,"modelid":5,"colorid":1,"licenseplate":"ADD 09","year":2009,"mileage":1521,
                        "milessincemaintenance":1521,"available":true},
                    {"vehicleid":4,"modelid":8,"colorid":7,"licenseplate":"SDU-582","year":2000,"mileage":27003,
                        "milessincemaintenance":19000,"available":true},
                    {"vehicleid":5,"modelid":10,"colorid":5,"licenseplate":"DSU-285","year":2014,"mileage":52021,
                        "milessincemaintenance":14999,"available":true}
                ]);
            }))
        });
        it('GET: single vehicle', () => {
            http.get(getOptions('/vehicles/1'), res => parseResponse(res, (body) => {
                expect(body).toEqual([ { "vehicleid":1,"modelid":2,"colorid":4,"licenseplate":"2FAST4U","year":1996,"mileage":25000,
                    "milessincemaintenance":3000,"available":true } ]);
            }))
        });
        it('GET: all rentals', () => {
            http.get(getOptions('/rentals'), res => parseResponse(res, (body) => {
                expect(body).toEqual([
                    {"customerid":1,"vehicleid":3,"rentedsince":"2017-05-10T22:00:00.000Z"},
                    {"customerid":3,"vehicleid":4,"rentedsince":"2017-09-21T22:00:00.000Z"},
                    {"customerid":4,"vehicleid":5,"rentedsince":"2017-10-31T23:00:00.000Z"},
                    {"customerid":1,"vehicleid":1,"rentedsince":"2017-09-04T22:00:00.000Z"}
                ]);
            }))
        });
        it('GET: single rental through both customerId and vehicleId', () => {
            http.get(getOptions('/rentals/1/3'), res => parseResponse(res, (body) => {
                expect(body).toEqual([ { "customerid":1,"vehicleid":3,"rentedsince":"2017-05-10T22:00:00.000Z" } ]);
            }))
        });
        it('GET: all rentals from one customer', () => {
            http.get(getOptions('/rentals?customerid=1'), res => parseResponse(res, (body) => {
                expect(body).toEqual([
                    { "customerid":1,"vehicleid":3,"rentedsince":"2017-05-10T22:00:00.000Z" },
                    { "customerid":1,"vehicleid":1,"rentedsince":"2017-09-04T22:00:00.000Z" }
                ]);
            }))
        });
    });
    describe('GET Tests', () => {
        const getOptions = setMethod('GET');
        const postOptions = setMethod('POST');

        it('POST: adding a new color', () => {
            const req = http.request(postOptions('/colors'));
            req.write('{"name": "turquoise"}');
            req.end();

            http.get(getOptions('/colors/13'), res => parseResponse(res, (body) => {
                expect(body).toEqual([ { "colorid":13, "name":"turquoise" } ]);
            }))
        });
        it('POST: adding a new make', () => {
            const req = http.request(postOptions('/makes'));
            req.write('{"name": "Citroen"}');
            req.end();

            http.get(getOptions('/makes/17'), res => parseResponse(res, (body) => {
                expect(body).toEqual([ { "makeid":17, "name":"Citroen" } ]);
            }))
        });
        it('POST: adding a new type', () => {
            const req = http.request(postOptions('/types'));
            req.write('{"name": "scooter"}');
            req.end();

            http.get(getOptions('/types/4'), res => parseResponse(res, (body) => {
                expect(body).toEqual([ { "typeid":4, "name":"scooter" } ]);
            }))
        });
        it('POST: adding a new model', () => {
            const req = http.request(postOptions('/models'));
            req.write('{"name": "C4", "makeid": 17, "typeid": 1}');
            req.end();

            http.get(getOptions('/models/11'), res => parseResponse(res, (body) => {
                expect(body).toEqual([ { "modelid":11,"name": "C4","makeid": 17,"typeid": 1,"maximumcargoload":null}]);
            }))
        });
        it('POST: adding a new customer', () => {
            const req = http.request(postOptions('/customers'));
            req.write(`{"firstname":"Markus","lastname":"Mustermann","postalcode":"41224",
                    "address":"42 S Solling Str.","city":"Sollingen","phonenumber":"214-552-1233",
                    "customersince":"2004-12-11"}`);
            req.end();

            http.get(getOptions('/customers/5'), res => parseResponse(res, (body) => {
                expect(body).toEqual([{"customerid":5,"firstname":"Markus","lastname":"Mustermann","postalcode":"41224",
                    "address":"42 S Solling Str.","city":"Sollingen","phonenumber":"214-552-1233",
                    // TODO: Find out why the heck DB returns date-1 instead of date (time zone?)
                    "customersince":"2004-12-10T23:00:00.000Z"}
                ]);
            }))
        });
        it('POST: adding a new vehicle', () => {
            const req = http.request(postOptions('/vehicles'));
            req.write(`{"modelid":6,"colorid":7,"licenseplate":"Y-U-MAD","year":2015,
                    "mileage":22121, "milessincemaintenance":8512,"available":false}`);
            req.end();

            http.get(getOptions('/vehicles/6'), res => parseResponse(res, (body) => {
                expect(body).toEqual([{"vehicleid":6,"modelid":6,"colorid":7,"licenseplate":"Y-U-MAD","year":2015,
                    "mileage":22121, "milessincemaintenance":8512,"available":false}
                ]);
            }))
        });
        it('POST: adding a new rental', () => {
            const req = http.request(postOptions('/rentals'));
            req.write(`{"customerid":4,"vehicleid":6,"rentedsince":"2017-11-02"}`);
            req.end();

            http.get(getOptions('/rentals/4/6'), res => parseResponse(res, (body) => {
                expect(body).toEqual([{"customerid":4,"vehicleid":6,"rentedsince":"2017-11-01T23:00:00.000Z"}]);
            }))
        });
    });
});