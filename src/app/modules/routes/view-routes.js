const rentalForm = require('../views/rental-form');
const calc = require('../views/calc-form');
const vehicleForm = require('../views/vehicle-form');

module.exports = (router) => {
	return {
		rentalFormView: (route) => rentalForm(router, route),
		calcPriceView: (route) => calc(router, route),
		vehicleFormView: (route) => vehicleForm(router, route)
	};
};