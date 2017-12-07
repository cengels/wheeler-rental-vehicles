const express = require('express');
const router = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const HTTP = require('./definitions/http-verbs');
const newApiRoute = require('./modules/routes/api-routes')(router);
const newViewRoute = require('./modules/routes/view-routes')(router);
const expressValidator = require('express-validator');
require('./modules/db/initialize');

const getProps = (item, props) => {
	props = props.split(' ');

	if (props.length === 1) {
		return item[props];
	} else {
		const values = props.map(prop => item[prop]);
		const otherValues = values.slice(1, values.length).join(' ');

		return `${values[0]} (${otherValues})`;
	}
};

const returnDropdown = (array, keyValue, textProps, selected) => {
	return array.map(obj => {
		const value = obj[keyValue];
		const selectedText = parseInt(selected) === parseInt(value) ? 'selected' : '';
		const props = textProps.split(' ').map(prop => obj[prop]).join(' ');

		return `<option value="${value}" ${selectedText}>${value}: ${props}</option>`;
	});
};

const handlebarsConfig = {
	layoutsDir: __dirname + '/views/layouts',
	partialsDir: __dirname + '/views/partials',
	defaultLayout: 'dashboard',
	helpers: {
		'capitalize': (str) => str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' '),
		'getProps': getProps,
		'returnDropdown': returnDropdown
	}
};

const searchDirectory = process.env.NODE_ENV === 'production' ? '/dist' : '/src';
const STATIC_FILE_PATH = __dirname.slice(0, __dirname.lastIndexOf(searchDirectory)) + '/public';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(expressValidator());
router.use('/public', express.static(STATIC_FILE_PATH));
router.engine('handlebars', handlebars(handlebarsConfig));
router.set('view engine', 'handlebars');
router.set('views', __dirname + '/views');

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

newViewRoute.frontPageView();
newViewRoute.featuresView();
newViewRoute.rentalFormView();
newViewRoute.calcPriceView();
newViewRoute.vehicleFormView();
newViewRoute.customerFormView();

module.exports = router;