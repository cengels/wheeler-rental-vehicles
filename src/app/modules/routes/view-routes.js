const rentalForm = require('./views/rental-form');
const calc = require('./views/calc-form');

module.exports = (router) => {
	return {
		rentalFormView: (route) => rentalForm(router, route),
		calcPriceView: (route) => calc(router, route)
	};
};