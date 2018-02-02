const Numbers = require('../../definitions/numbers');

class Vehicle {
	constructor(props) {
		this._licensePlate = props.licensePlate;
		this._mileage = props.mileage;
		this._milesSinceMaintenance = props.milesSinceMaintenance;
		this._availableForRent = props.availableForRent;
		this._MAX_MAINTENANCE_DISTANCE = props.MAX_MAINTENANCE_DISTANCE;
		this._PRICE_PER_DAY = props.PRICE_PER_DAY;
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

	get milesSinceMaintenance() {
		return this._milesSinceMaintenance;
	}

	set milesSinceMaintenance(value) {
		this._milesSinceMaintenance = value;
	}

	get availableForRent() {
		return this._availableForRent;
	}

	set availableForRent(value) {
		this._availableForRent = value;
	}

	getRentPrice(days, clockedDistance) {
		return (days * this._PRICE_PER_DAY)
			+ (clockedDistance * this._PRICE_PER_MILE);
	}

	getMaintenancePrice(clockedDistance) {
		const totalDistanceSinceMaintenance = this._milesSinceMaintenance
			+ clockedDistance;

		if (totalDistanceSinceMaintenance > this._MAX_MAINTENANCE_DISTANCE) {
			return this._PRICE_PER_MAINTENANCE;
		}

		return 0;
	}
}

module.exports = Vehicle;