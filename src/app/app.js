const router = require('express')();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const HTTP = require('./definitions/http-verbs');
const newStandardRoute = require('./modules/routes/new-route')(router);
const renderView = require('./modules/routes/render-view')(router);

const handlebarsConfig = {
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'main'
};

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.engine('handlebars', handlebars(handlebarsConfig));
router.set('view engine', 'handlebars');
router.set('views', __dirname + '/views');

newStandardRoute('/vehicles', HTTP.GET, HTTP.POST, HTTP.DELETE);
newStandardRoute('/vehicles/:vehicleId', HTTP.GET, HTTP.DELETE);
newStandardRoute('/customers', HTTP.GET, HTTP.POST, HTTP.DELETE);
newStandardRoute('/customers/:customerId', HTTP.GET, HTTP.DELETE);
newStandardRoute('/rentals', HTTP.GET, HTTP.POST), HTTP.DELETE;
newStandardRoute('/rentals/:customerId/:vehicleId', HTTP.GET, HTTP.DELETE);
newStandardRoute('/colors', HTTP.GET, HTTP.POST, HTTP.DELETE);
newStandardRoute('/colors/:colorId', HTTP.GET, HTTP.DELETE);
newStandardRoute('/types', HTTP.GET, HTTP.POST, HTTP.DELETE);
newStandardRoute('/types/:typeId', HTTP.GET, HTTP.DELETE);
newStandardRoute('/makes', HTTP.GET, HTTP.POST, HTTP.DELETE);
newStandardRoute('/makes/:makeId', HTTP.GET, HTTP.DELETE);
newStandardRoute('/models', HTTP.GET, HTTP.POST, HTTP.DELETE);
newStandardRoute('/models/:modelId', HTTP.GET, HTTP.DELETE);

renderView('/', 'home');

module.exports = router;