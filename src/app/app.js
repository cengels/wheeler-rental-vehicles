const router = require('express')();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const HTTP = require('./definitions/http-verbs');
const newApiRoute = require('./modules/routes/api-routes')(router);
const newStandardRoute = require('./modules/routes/view-routes')(router);
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

const handlebarsConfig = {
	layoutsDir: __dirname + '/views/layouts',
	partialsDir: __dirname + '/views/partials',
	defaultLayout: 'main',
	helpers: {
		'capitalize': (str) => str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' '),
		'getProps': getProps
	}
};

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(expressValidator());
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

newStandardRoute.rentalFormView('/');
newStandardRoute.calcPriceView('/calc');
newStandardRoute.vehicleFormView('/vehicle-form');

module.exports = router;