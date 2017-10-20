const Vehicle = require('../Vehicle.js');
const Numbers = require('../definitions/numbers.js');

class Car extends Vehicle {
    constructor(licensePlate, mileage, distanceSinceMaintenance, availableForRent) {
        super(licensePlate, mileage, distanceSinceMaintenance, availableForRent,
            Numbers.CAR.MAX_MAINTENANCE_DISTANCE, Numbers.CAR.PRICE_PER_DAY);
    }
}

module.exports = Car;