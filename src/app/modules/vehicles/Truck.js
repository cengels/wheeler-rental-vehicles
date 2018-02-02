const Vehicle = require('./Vehicle');
const Numbers = require('../../definitions/numbers');

class Truck extends Vehicle {
	constructor(props) {
		super({
			'MAX_MAINTENANCE_DISTANCE': Numbers.TRUCK.MAX_MAINTENANCE_DISTANCE,
			'PRICE_PER_DAY':
				props.cargoLoad > Numbers.TRUCK.CARGO_LOAD_THRESHOLD
					? Numbers.TRUCK.PRICE_PER_DAY_HEAVY
					: Numbers.TRUCK.PRICE_PER_DAY_REGULAR,
			'availableForRent': props.availableForRent,
			'licensePlate': props.licensePlate,
			'mileage': props.mileage,
			'milesSinceMaintenance': props.milesSinceMaintenance
		});

		this._maxCargoLoad = props.cargoLoad;
	}

	get maxCargoLoad() {
		return this._maxCargoLoad;
	}

	set maxCargoLoad(value) {
		this._maxCargoLoad = value;
	}
}

module.exports = Truck;