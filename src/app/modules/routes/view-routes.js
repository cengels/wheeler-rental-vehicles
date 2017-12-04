const Views = require('../../definitions/views');
const rentalForm = require('../views/rental-form');
const calc = require('../views/calc-form');
const vehicleForm = require('../views/vehicle-form');
const customerForm = require('../views/customer-form');

module.exports = (router) => {
	return {
		rentalFormView: () => rentalForm(router, Views.RentalForm),
		calcPriceView: () => calc(router, Views.CalcForm),
		vehicleFormView: () => vehicleForm(router, Views.VehicleForm),
		customerFormView: () => customerForm(router, Views.CustomerForm)
	};
};