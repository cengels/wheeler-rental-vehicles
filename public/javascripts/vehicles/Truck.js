const Vehicle = require('../Vehicle.js');
const Definitions = require('../units.js');
const User = require('../user.js');

class Truck extends Vehicle {
    constructor(licensePlate, mileage, milesSinceMaintenance, cargoLoad, availableForRent) {
        let _CARGO_LOAD_THRESHOLD;
        let _MAX_MAINTENANCE_DISTANCE;
        switch (User.system) {
            case Definitions.UNITS.IMPERIAL:
                _MAX_MAINTENANCE_DISTANCE = 12430;
                _CARGO_LOAD_THRESHOLD = 1.98;
                break;
            case Definitions.UNITS.METRIC:
            default:
                _MAX_MAINTENANCE_DISTANCE = 20000;
                _CARGO_LOAD_THRESHOLD = 1800;
        }

        let _PRICE_PER_DAY_HEAVY;
        let _PRICE_PER_DAY_REGULAR;

        switch (User.country) {
            case Definitions.COUNTRIES.US:
                _PRICE_PER_DAY_HEAVY = 95;
                _PRICE_PER_DAY_REGULAR = 60;
                break;
            case Definitions.COUNTRIES.GB:
                _PRICE_PER_DAY_HEAVY = 72;
                _PRICE_PER_DAY_REGULAR = 45;
                break;
            case Definitions.COUNTRIES.DE:
            default:
                _PRICE_PER_DAY_HEAVY = 80;
                _PRICE_PER_DAY_REGULAR = 50;
        }

        super(licensePlate, mileage, milesSinceMaintenance, availableForRent, _MAX_MAINTENANCE_DISTANCE,
            cargoLoad > _CARGO_LOAD_THRESHOLD ? _PRICE_PER_DAY_HEAVY : _PRICE_PER_DAY_REGULAR
        );
    }

    get cargoLoad() {
        return this._cargoLoad;
    }

    set cargoLoad(value) {
        this._cargoLoad = value;
    }
}

module.exports = Truck;