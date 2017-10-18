const Vehicle = require('../Vehicle.js');

class Car extends Vehicle {
    constructor(licensePlate, mileage, distanceSinceMaintenance, availableForRent) {
        super(licensePlate, mileage, distanceSinceMaintenance, availableForRent, 30000, 30);
    }
}

module.exports = Car;