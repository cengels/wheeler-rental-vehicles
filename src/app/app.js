const router = require('express')();
const bodyParser = require('body-parser');
const HTTP = require('./definitions/http-verbs');
const newStandardRoute = require('./modules/new-route')(router);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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

module.exports = router;