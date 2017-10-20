const Numbers = require('./definitions/numbers.js');

class Vehicle {
    constructor(licensePlate, mileage, distanceSinceMaintenance, availableForRent,
                MAX_MAINTENANCE_DISTANCE, PRICE_PER_DAY) {
        this._licensePlate = licensePlate;
        this._mileage = mileage;
        this._distanceSinceMaintenance = distanceSinceMaintenance;
        this._availableForRent = availableForRent;
        this._MAX_MAINTENANCE_DISTANCE = MAX_MAINTENANCE_DISTANCE;
        this._PRICE_PER_DAY = PRICE_PER_DAY;
        this._PRICE_PER_MILE = Numbers.PRICE_PER_MILE_DEFAULT;
        this._PRICE_PER_MAINTENANCE = Numbers.PRICE_PER_MAINTENANCE;
    }

    get licensePlate() {
        return this._licensePlate;
    }

    set licensePlate(value) {
        this._licensePlate = value;
    }

    get mileage() {
        return this._mileage;
    }

    set mileage(value) {
        this._mileage = value;
    }

    get distanceSinceMaintenance() {
        return this._distanceSinceMaintenance;
    }

    set distanceSinceMaintenance(value) {
        this._distanceSinceMaintenance = value;
    }

    get availableForRent() {
        return this._availableForRent;
    }

    set availableForRent(value) {
        this._availableForRent = value;
    }

    getRentPrice(days, clockedDistance) {
        if (!this.availableForRent) {
            throw new Error('Vehicle isn\'t available for rent.');
        }

        return days * this._PRICE_PER_DAY
            + clockedDistance * this._PRICE_PER_MILE
            + this.getMaintenancePrice(clockedDistance);
    }

    getMaintenancePrice(clockedDistance) {
        if (this._distanceSinceMaintenance + clockedDistance > this._MAX_MAINTENANCE_DISTANCE) {
            return this._PRICE_PER_MAINTENANCE;
        } else {
            return 0;
        }
    }
}

module.exports = Vehicle;