const Vehicle = require('../Vehicle.js');
const Definitions = require('../units.js');
const User = require('../user.js');

class Car extends Vehicle {
    constructor(licensePlate, mileage, distanceSinceMaintenance, availableForRent) {

        let _MAX_MAINTENANCE_DISTANCE;
        switch (User.system) {
            case Definitions.UNITS.IMPERIAL:
                _MAX_MAINTENANCE_DISTANCE = 18640;
                break;
            case Definitions.UNITS.METRIC:
            default:
                _MAX_MAINTENANCE_DISTANCE = 30000;
        }

        let _PRICE_PER_DAY;
        switch (User.country) {
            case Definitions.COUNTRIES.US:
                _PRICE_PER_DAY = 35.53;
                break;
            case Definitions.COUNTRIES.GB:
                _PRICE_PER_DAY = 26.93;
                break;
            case Definitions.COUNTRIES.DE:
            default:
                _PRICE_PER_DAY = 30;
        }

        super(licensePlate, mileage, distanceSinceMaintenance, availableForRent, _MAX_MAINTENANCE_DISTANCE, _PRICE_PER_DAY);
    }
}

module.exports = Car;