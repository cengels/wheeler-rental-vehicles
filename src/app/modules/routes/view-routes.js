const rentalForm = require('../views/rental-form');
const calc = require('../views/calc-form');
const vehicleForm = require('../views/vehicle-form');
const customerForm = require('../views/customer-form');

module.exports = (router) => {
	return {
		rentalFormView: (route) => rentalForm(router, route),
		calcPriceView: (route) => calc(router, route),
		vehicleFormView: (route) => vehicleForm(router, route),
		customerFormView: (route) => customerForm(router, route)
	};
};