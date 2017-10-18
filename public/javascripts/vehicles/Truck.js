require('../Vehicle.js');

class Truck extends Vehicle {
    constructor(licensePlate, mileage, milesSinceMaintenance, cargoLoad, availableForRent) {
        const _CARGO_LOAD_THRESHOLD = 1800;

        super(licensePlate, mileage, milesSinceMaintenance, availableForRent, 20000,
            cargoLoad > _CARGO_LOAD_THRESHOLD === cargoLoad ? 80 : 50
        );

        this._cargoLoad = cargoLoad;
    }

    get cargoLoad() {
        return this._cargoLoad;
    }

    set cargoLoad(value) {
        this._cargoLoad = value;
    }
}

module.exports = Truck;