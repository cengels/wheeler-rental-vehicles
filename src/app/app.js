const express = require('express');
const router = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const HTTP = require('./definitions/http-verbs');
const newApiRoute = require('./modules/routes/api-routes')(router);
const newViewRoute = require('./modules/routes/view-routes')(router);
const expressValidator = require('express-validator');
require('./modules/db/initialize');
const path = require('path');

const getProps = (item, props) => {
	const propsArray = props.split(' ');

	if (propsArray.length === 1) {
		return item[propsArray[0]];
	}

	const values = propsArray.map(prop => item[prop]);
	const otherValues = values.slice(1, values.length).join(' ');

	return `${values[0]} (${otherValues})`;
};

const returnDropdown = (array, keyValue, textProps, selected) =>
	array.map(obj => {
		const value = obj[keyValue];
		const selectedText = parseInt(selected, 10) === parseInt(value, 10)
			? 'selected'
			: '';
		const props = textProps.split(' ')
			.map(prop => obj[prop])
			.join(' ');

		// eslint-disable-next-line max-len
		return `<option value="${value}" ${selectedText}>${value}: ${props}</option>`;
	});

const handlebarsConfig = {
	'defaultLayout': 'dashboard',
	'helpers': {
		'capitalize': (str) => str.charAt(0).toUpperCase()
			+ str.slice(1).replace('-', ' '),
		getProps,
		returnDropdown
	},
	'layoutsDir': path.resolve(__dirname, '/views/layouts'),
	'partialsDir': path.resolve(__dirname, '/views/partials')
};

const searchDirectory = process.env.NODE_ENV === 'production'
	? '/dist'
	: '/src';
// eslint-disable-next-line prefer-template
const STATIC_FILE_PATH = __dirname
	.slice(
		0,
		__dirname.lastIndexOf(searchDirectory)
	) + '/public';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ 'extended': true }));
router.use(expressValidator());
router.use('/public', express.static(STATIC_FILE_PATH));
router.engine('handlebars', handlebars(handlebarsConfig));
router.set('view engine', 'handlebars');
router.set('views', path.resolve(__dirname, '/views'));

newApiRoute('/vehicles', HTTP.GET, HTTP.POST, HTTP.DELETE);
newApiRoute('/vehicles/:vehicleId', HTTP.GET, HTTP.DELETE);
newApiRoute('/customers', HTTP.GET, HTTP.POST, HTTP.DELETE);
newApiRoute('/customers/:customerId', HTTP.GET, HTTP.DELETE);
newApiRoute('/rentals', HTTP.GET, HTTP.POST, HTTP.DELETE);
newApiRoute('/rentals/:customerId/:vehicleId', HTTP.GET, HTTP.DELETE);
newApiRoute('/colors', HTTP.GET, HTTP.POST, HTTP.DELETE);
newApiRoute('/colors/:colorId', HTTP.GET, HTTP.DELETE);
newApiRoute('/types', HTTP.GET, HTTP.POST, HTTP.DELETE);
newApiRoute('/types/:typeId', HTTP.GET, HTTP.DELETE);
newApiRoute('/makes', HTTP.GET, HTTP.POST, HTTP.DELETE);
newApiRoute('/makes/:makeId', HTTP.GET, HTTP.DELETE);
newApiRoute('/models', HTTP.GET, HTTP.POST, HTTP.DELETE);
newApiRoute('/models/:modelId', HTTP.GET, HTTP.DELETE);

newViewRoute.allFrontEndViews();
newViewRoute.rentalFormView();
newViewRoute.calcPriceView();
newViewRoute.vehicleFormView();
newViewRoute.customerFormView();
newViewRoute.dashboardView();

module.exports = router;