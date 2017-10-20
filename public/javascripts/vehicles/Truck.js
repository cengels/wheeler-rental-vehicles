const Vehicle = require('../Vehicle.js');
const Numbers = require('../definitions/numbers.js');

class Truck extends Vehicle {
    constructor(licensePlate, mileage, milesSinceMaintenance, cargoLoad, availableForRent) {
        super(licensePlate, mileage, milesSinceMaintenance, availableForRent, Numbers.TRUCK.MAX_MAINTENANCE_DISTANCE,
            cargoLoad > Numbers.TRUCK.CARGO_LOAD_THRESHOLD
                ? Numbers.TRUCK.PRICE_PER_DAY_HEAVY
                : Numbers.TRUCK.PRICE_PER_DAY_REGULAR
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