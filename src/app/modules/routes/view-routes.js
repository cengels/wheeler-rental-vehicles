const Views = require('../../definitions/views');
const mainPages = require('../views/main-pages');
const rentalForm = require('../views/rental-form');
const calc = require('../views/calc-form');
const vehicleForm = require('../views/vehicle-form');
const customerForm = require('../views/customer-form');
const dashboard = require('../views/dashboard');

module.exports = (router) => {
	return {
		'allFrontEndViews': () => {
			mainPages.frontPageView(router, Views.FrontPage);
			mainPages.featuresView(router, Views.FeaturesPage);
			mainPages.liteSignUpView(router, Views.LiteSignUpPage);
			mainPages.regularSignUpView(router, Views.RegularSignUpPage);
			mainPages.aboutView(router, Views.AboutPage);
			mainPages.contactView(router, Views.ContactPage);
		},
		'calcPriceView': () => calc(router, Views.CalcForm),
		'customerFormView': () => customerForm(router, Views.CustomerForm),
		'dashboardView': () => dashboard(router, Views.Dashboard),
		'rentalFormView': () => rentalForm(router, Views.RentalForm),
		'vehicleFormView': () => vehicleForm(router, Views.VehicleForm)
	};
};