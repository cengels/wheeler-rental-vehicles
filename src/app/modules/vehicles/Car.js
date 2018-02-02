const Vehicle = require('./Vehicle');
const Numbers = require('../../definitions/numbers');

class Car extends Vehicle {
	constructor(props) {
		super({
			'MAX_MAINTENANCE_DISTANCE': Numbers.CAR.MAX_MAINTENANCE_DISTANCE,
			'PRICE_PER_DAY': Numbers.CAR.PRICE_PER_DAY,
			'availableForRent': props.availableForRent,
			'licensePlate': props.licensePlate,
			'mileage': props.mileage,
			'milesSinceMaintenance': props.milesSinceMaintenance
		});
	}
}

module.exports = Car;