const Views = require('../../definitions/views');
const mainPages = require('../views/main-pages');
const rentalForm = require('../views/rental-form');
const calc = require('../views/calc-form');
const vehicleForm = require('../views/vehicle-form');
const customerForm = require('../views/customer-form');

module.exports = (router) => {
	return {
		allFrontEndViews: () => {
			mainPages.frontPageView(router, Views.FrontPage);
			mainPages.featuresView(router, Views.FeaturesPage);
			mainPages.liteSignUpView(router, Views.LiteSignUpPage);
			mainPages.regularSignUpView(router, Views.RegularSignUpPage);
			mainPages.aboutView(router, Views.AboutPage);
			mainPages.contactView(router, Views.ContactPage);
		},
		rentalFormView: () => rentalForm(router, Views.RentalForm),
		calcPriceView: () => calc(router, Views.CalcForm),
		vehicleFormView: () => vehicleForm(router, Views.VehicleForm),
		customerFormView: () => customerForm(router, Views.CustomerForm)
	};
};