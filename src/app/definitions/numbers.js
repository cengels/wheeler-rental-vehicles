const Units = require('./units');
const User = require('../user');

const ALL_NUMBERS = {
	'CAR': {},
	'TRUCK': {}
};

switch (User.system) {
	case Units.SYSTEMS.IMPERIAL:
		ALL_NUMBERS.CAR.MAX_MAINTENANCE_DISTANCE = 18640;
		ALL_NUMBERS.TRUCK.MAX_MAINTENANCE_DISTANCE = 12430;
		ALL_NUMBERS.TRUCK.CARGO_LOAD_THRESHOLD = 1.98;
		break;
	case Units.SYSTEMS.METRIC:
	default:
		ALL_NUMBERS.CAR.MAX_MAINTENANCE_DISTANCE = 30000;
		ALL_NUMBERS.TRUCK.MAX_MAINTENANCE_DISTANCE = 20000;
		ALL_NUMBERS.TRUCK.CARGO_LOAD_THRESHOLD = 1800;
}

switch (User.country) {
	case Units.COUNTRIES.US:
		ALL_NUMBERS.PRICE_PER_MILE_DEFAULT = 0.69;
		ALL_NUMBERS.PRICE_PER_MAINTENANCE = 600;
		ALL_NUMBERS.CAR.PRICE_PER_DAY = 33.53;
		ALL_NUMBERS.TRUCK.PRICE_PER_DAY_HEAVY = 95;
		ALL_NUMBERS.TRUCK.PRICE_PER_DAY_REGULAR = 60;
		break;
	case Units.COUNTRIES.GB:
		ALL_NUMBERS.PRICE_PER_MILE_DEFAULT = 0.52;
		ALL_NUMBERS.PRICE_PER_MAINTENANCE = 450;
		ALL_NUMBERS.CAR.PRICE_PER_DAY = 26.93;
		ALL_NUMBERS.TRUCK.PRICE_PER_DAY_HEAVY = 72;
		ALL_NUMBERS.TRUCK.PRICE_PER_DAY_REGULAR = 45;
		break;
	case Units.COUNTRIES.DE:
	default:
		ALL_NUMBERS.PRICE_PER_MILE_DEFAULT = 0.58;
		ALL_NUMBERS.PRICE_PER_MAINTENANCE = 500;
		ALL_NUMBERS.CAR.PRICE_PER_DAY = 30;
		ALL_NUMBERS.TRUCK.PRICE_PER_DAY_HEAVY = 80;
		ALL_NUMBERS.TRUCK.PRICE_PER_DAY_REGULAR = 50;
}

module.exports = ALL_NUMBERS;