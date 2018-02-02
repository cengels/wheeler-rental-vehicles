const Vehicle = require('./Vehicle');
const Numbers = require('../../definitions/numbers');

class Car extends Vehicle {
	constructor(props) {
		super({
			'MAX_MAINTENANCE_DISTANCE': Numbers.CAR.MAX_MAINTENANCE_DISTANCE,
			'PRICE_PER_DAY': Numbers.CAR.PRICE_PER_DAY,
			'availableForRent': props.availableForRent,
			'distanceSinceMaintenance': props.distanceSinceMaintenance,
			'licensePlate': props.licensePlate,
			'mileage': props.mileage
		});
	}
}

module.exports = Car;