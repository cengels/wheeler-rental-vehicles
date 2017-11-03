const Vehicle = require('../Vehicle');
const Numbers = require('../../definitions/numbers');

class Truck extends Vehicle {
    constructor(licensePlate, mileage, milesSinceMaintenance, cargoLoad, availableForRent) {
        super(licensePlate, mileage, milesSinceMaintenance, availableForRent, Numbers.TRUCK.MAX_MAINTENANCE_DISTANCE,
            cargoLoad > Numbers.TRUCK.CARGO_LOAD_THRESHOLD
                ? Numbers.TRUCK.PRICE_PER_DAY_HEAVY
                : Numbers.TRUCK.PRICE_PER_DAY_REGULAR
        );

        this._maxCargoLoad = cargoLoad;
    }

    get maxCargoLoad() {
        return this._maxCargoLoad;
    }

    set maxCargoLoad(value) {
        this._maxCargoLoad = value;
    }
}

module.exports = Truck;