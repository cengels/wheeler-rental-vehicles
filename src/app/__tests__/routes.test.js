const request = require('request-promise-native');
const HTTP = require('../definitions/http-verbs');

const originalTables = {
	colors: [
		{'colorid':1,'name':'black'}, {'colorid':2,'name':'gray'},{'colorid':3,'name':'silver'},
		{'colorid':4,'name':'white'},{'colorid':5,'name':'blue'},{'colorid':6,'name':'red'},
		{'colorid':7,'name':'green'},{'colorid':8,'name':'pink'},{'colorid':9,'name':'purple'},
		{'colorid':10,'name':'brown'},{'colorid':11,'name':'orange'},{'colorid':12,'name':'yellow'}
	],

	makes: [
		{'makeid':1,'name':'Audi'}, {'makeid':2,'name':'BMW'}, {'makeid':3,'name':'Ferrari'},
		{'makeid':4,'name':'Ford'}, {'makeid':5,'name':'Harley Davidson'}, {'makeid':6,'name':'Honda'},
		{'makeid':7,'name':'Hyundai'}, {'makeid':8,'name':'Lamborghini'},
		{'makeid':9,'name':'Mercedes-Benz'}, {'makeid':10,'name':'Mini'}, {'makeid':11,'name':'Nissan'},
		{'makeid':12,'name':'Opel'}, {'makeid':13,'name':'Porsche'}, {'makeid':14,'name':'Tesla'},
		{'makeid':15,'name':'Toyota'},{'makeid':16,'name':'Volkswagen'}
	],

	types: [ {'typeid':1,'name':'Car'}, {'typeid':2,'name':'Truck'}, {'typeid':3,'name':'Motorcycle'} ],

	models: [
		{'modelid':1,'name':'Model T','makeid':4,'typeid':1,'maximumcargoload':null},
		{'modelid':2,'name':'Beetle','makeid':16,'typeid':1,'maximumcargoload':null},
		{'modelid':3,'name':'Corolla','makeid':15,'typeid':1,'maximumcargoload':null},
		{'modelid':4,'name':'Falcon','makeid':4,'typeid':1,'maximumcargoload':null},
		{'modelid':5,'name':'Gol','makeid':16,'typeid':1,'maximumcargoload':null},
		{'modelid':6,'name':'Santana','makeid':16,'typeid':1,'maximumcargoload':null},
		{'modelid':7,'name':'Golf','makeid':16,'typeid':1,'maximumcargoload':null},
		{'modelid':8,'name':'E-650','makeid':4,'typeid':2,'maximumcargoload':11793},
		{'modelid':9,'name':'F-750','makeid':4,'typeid':2,'maximumcargoload':14969},
		{'modelid':10,'name':'Tacoma Limited','makeid':15,'typeid':2,'maximumcargoload':508}
	],

	customers: [
		{'customerid':1,'firstname':'James','lastname':'Butt','postalcode':'70116',
			'address':'6649 N Blue Gum St','city':'New Orleans','phonenumber':'504-621-8927',
			'customersince':'1999-01-08'},
		{'customerid':2,'firstname':'Josephine','lastname':'Darakjy','postalcode':'48116',
			'address':'4 B Blue Ridge Blvd','city':'Brighton','phonenumber':'810-292-9388',
			'customersince':'2003-03-25'},
		{'customerid':3,'firstname':'Art','lastname':'Venere','postalcode':'08014',
			'address':'8 W Cerritos Ave #54','city':'Bridgeport','phonenumber':'856-636-8749',
			'customersince':'2004-12-11'},
		{'customerid':4,'firstname':'Lenna','lastname':'Paprocki','postalcode':'99501',
			'address':'639 Main St','city':'Anchorage','phonenumber':'907-385-4412',
			'customersince':'1998-05-05'}
	],

	vehicles: [
		{'vehicleid':1,'modelid':2,'colorid':4,'licenseplate':'2FAST4U','year':1996,'mileage':25000,
			'milessincemaintenance':3000,'available':true},
		{'vehicleid':2,'modelid':1,'colorid':1,'licenseplate':'KID 507','year':2004,'mileage':23999,
			'milessincemaintenance':4539,'available':false},
		{'vehicleid':3,'modelid':5,'colorid':1,'licenseplate':'ADD 09','year':2009,'mileage':1521,
			'milessincemaintenance':1521,'available':true},
		{'vehicleid':4,'modelid':8,'colorid':7,'licenseplate':'SDU-582','year':2000,'mileage':27003,
			'milessincemaintenance':19000,'available':true},
		{'vehicleid':5,'modelid':10,'colorid':5,'licenseplate':'DSU-285','year':2014,'mileage':52021,
			'milessincemaintenance':14999,'available':true},
		{'vehicleid':6,'modelid':3,'colorid':2,'licenseplate':'AVG-512','year':1999,'mileage':27003,
			'milessincemaintenance':19000,'available':true},
		{'vehicleid':7,'modelid':4,'colorid':6,'licenseplate':'DTS-G32','year':1998,'mileage':52021,
			'milessincemaintenance':14999,'available':true}
	],

	rentals: [
		{'customerid':1,'vehicleid':3,'rentedsince':'2017-05-11'},
		{'customerid':3,'vehicleid':4,'rentedsince':'2017-09-22'},
		{'customerid':4,'vehicleid':5,'rentedsince':'2017-11-01'},
		{'customerid':1,'vehicleid':1,'rentedsince':'2017-09-05'}
	]
};

const getOptions = (method, path, body) => {
	let options = {
		uri: 'http://localhost:8080' + path,
		method: method,
		json: true
	};

	if (body) {
		options.body = body;
	}

	return options;
};

function httpRequest(method, path, requestBody) {
	return new Promise((resolve, reject) => {
		request(getOptions(method, path, requestBody))
			.then((responseBody) => resolve(responseBody))
			.catch((err) => reject(err));
	});
}

describe('Integration Tests', () => {
	describe('GET Tests', () => {
		it('GET: all colors', () => {
			expect.assertions(1);
			return expect(httpRequest(HTTP.GET, '/colors')).resolves.toEqual(originalTables['colors']);
		});
		it('GET: single color', () => {
			expect.assertions(1);
			return expect(httpRequest(HTTP.GET, '/colors/5')).resolves.toEqual( [ originalTables['colors'][4] ] );
		});
		it('GET: all makes', () => {
			expect.assertions(1);
			return expect(httpRequest(HTTP.GET, '/makes')).resolves.toEqual(originalTables['makes']);
		});
		it('GET: single make', () => {
			expect.assertions(1);
			return expect(httpRequest(HTTP.GET, '/makes/3')).resolves.toEqual( [ originalTables['makes'][2] ] );
		});
		it('GET: all types', () => {
			expect.assertions(1);
			return expect(httpRequest(HTTP.GET, '/types')).resolves.toEqual(originalTables['types']);
		});
		it('GET: single type', () => {
			expect.assertions(1);
			return expect(httpRequest(HTTP.GET, '/types/2')).resolves.toEqual( [ originalTables['types'][1] ] );
		});
		it('GET: all models', () => {
			expect.assertions(1);
			return expect(httpRequest(HTTP.GET, '/models')).resolves.toEqual(originalTables['models']);
		});
		it('GET: single model', () => {
			expect.assertions(1);
			return expect(httpRequest(HTTP.GET, '/models/5')).resolves.toEqual( [ originalTables['models'][4] ] );
		});
		it('GET: all customers', () => {
			expect.assertions(1);
			return expect(httpRequest(HTTP.GET, '/customers')).resolves.toEqual(originalTables['customers']);
		});
		it('GET: single customer', () => {
			expect.assertions(1);
			return expect(httpRequest(HTTP.GET, '/customers/3')).resolves.toEqual( [ originalTables['customers'][2] ] );
		});
		it('GET: all vehicles', () => {
			expect.assertions(1);
			return expect(httpRequest(HTTP.GET, '/vehicles')).resolves.toEqual(originalTables['vehicles']);
		});
		it('GET: single vehicle', () => {
			expect.assertions(1);
			return expect(httpRequest(HTTP.GET, '/vehicles/1')).resolves.toEqual( [ originalTables['vehicles'][0] ] );
		});
		it('GET: all rentals', () => {
			expect.assertions(1);
			return expect(httpRequest(HTTP.GET, '/rentals')).resolves.toEqual(originalTables['rentals']);
		});
		it('GET: single rental through both customerId and vehicleId', () => {
			expect.assertions(1);
			return expect(httpRequest(HTTP.GET, '/rentals/1/3')).resolves.toEqual( [ originalTables['rentals'][0] ] );
		});
		it('GET: all rentals from one customer', () => {
			expect.assertions(1);
			return expect(httpRequest(HTTP.GET, '/rentals?customerid=1')).resolves
				.toEqual( [ originalTables.rentals[0], originalTables.rentals[3] ] );
		});
	});

	describe('POST Tests', () => {
		it('POST: adding a new color', () => {
			const dataObject = {'name': 'turquoise'};
			const expectedDataObject = Object.assign({}, {'colorid': 13}, dataObject);
			expect.assertions(1);
			return httpRequest(HTTP.POST, '/colors', dataObject)
				.then(() => expect(httpRequest(HTTP.GET, '/colors/13')).resolves.toEqual([expectedDataObject]));
		});
		it('POST: adding a new make', () => {
			const dataObject = {'name': 'Citroen'};
			const expectedDataObject = Object.assign({}, {'makeid': 17}, dataObject);
			expect.assertions(1);
			return httpRequest(HTTP.POST, '/makes', dataObject)
				.then(() => expect(httpRequest(HTTP.GET, '/makes/17')).resolves.toEqual([expectedDataObject]));
		});
		it('POST: adding a new type', () => {
			const dataObject = {'name': 'Scooter'};
			const expectedDataObject = Object.assign({}, {'typeid': 4}, dataObject);
			expect.assertions(1);
			return httpRequest(HTTP.POST, '/types', dataObject)
				.then(() => expect(httpRequest(HTTP.GET, '/types/4')).resolves.toEqual([expectedDataObject]));
		});
		it('POST: adding a new model', () => {
			const dataObject = {'name': 'C4', 'makeid': 17, 'typeid': 1};
			const expectedDataObject = Object.assign({}, {'modelid': 11, 'maximumcargoload':null}, dataObject);
			expect.assertions(1);
			return httpRequest(HTTP.POST, '/models', dataObject)
				.then(() => expect(httpRequest(HTTP.GET, '/models/11')).resolves.toEqual([expectedDataObject]));
		});
		it('POST: adding a new customer', () => {
			// TODO: Fix date subtracting one day for some reason. (timezone?)

			const dataObject = {'firstname':'Markus','lastname':'Mustermann','postalcode':'41224',
				'address':'42 S Solling Str.','city':'Sollingen','phonenumber':'214-552-1233',
				'customersince':'2004-12-11'};
			const expectedDataObject = Object.assign({}, {'customerid': 5}, dataObject);
			expect.assertions(1);
			return httpRequest(HTTP.POST, '/customers', dataObject)
				.then(() => expect(httpRequest(HTTP.GET, '/customers/5')).resolves.toEqual([expectedDataObject]));
		});
		it('POST: adding a new vehicle', () => {
			const dataObject = {'modelid':6,'colorid':7,'licenseplate':'Y-U-MAD','year':2015,
				'mileage':22121, 'milessincemaintenance':8512,'available':false};
			const expectedDataObject = Object.assign({}, {'vehicleid': 8}, dataObject);
			expect.assertions(1);
			return httpRequest(HTTP.POST, '/vehicles', dataObject)
				.then(() => expect(httpRequest(HTTP.GET, '/vehicles/8')).resolves.toEqual([expectedDataObject]));
		});
		it('POST: adding a new rental', () => {
			// TODO: Fix date subtracting one day for some reason. (timezone?)

			const dataObject = {'customerid':4,'vehicleid':6,'rentedsince':'2017-11-02'};
			expect.assertions(1);
			return httpRequest(HTTP.POST, '/rentals', dataObject)
				.then(() => expect(httpRequest(HTTP.GET, '/rentals/4/6')).resolves.toEqual([dataObject]));
		});
	});

	describe('DELETE Tests', () => {
		it('DELETE: deleting a color', () => {
			expect.assertions(1);
			return httpRequest(HTTP.DELETE, '/colors/10')
				.then(() => expect(httpRequest(HTTP.GET, '/colors/10')).resolves.toEqual([]));
		});
		it('DELETE: deleting a make', () => {
			expect.assertions(1);
			return httpRequest(HTTP.DELETE, '/makes/12')
				.then(() => expect(httpRequest(HTTP.GET, '/makes/12')).resolves.toEqual([]));
		});
		it('DELETE: deleting a type', () => {
			expect.assertions(1);
			return httpRequest(HTTP.DELETE, '/types/3')
				.then(() => expect(httpRequest(HTTP.GET, '/types/3')).resolves.toEqual([]));
		});
		it('DELETE: deleting a model', () => {
			expect.assertions(1);
			return httpRequest(HTTP.DELETE, '/models/4')
				.then(() => expect(httpRequest(HTTP.GET, '/models/4')).resolves.toEqual([]));
		});
		it('DELETE: deleting a customer', () => {
			expect.assertions(1);
			return httpRequest(HTTP.DELETE, '/customers/1')
				.then(() => expect(httpRequest(HTTP.GET, '/customers/1')).resolves.toEqual([]));
		});
		it('DELETE: deleting a vehicle', () => {
			expect.assertions(1);
			return httpRequest(HTTP.DELETE, '/vehicles/3')
				.then(() => expect(httpRequest(HTTP.GET, '/vehicles/3')).resolves.toEqual([]));
		});
		it('DELETE: deleting a rental', () => {
			expect.assertions(1);
			return httpRequest(HTTP.DELETE, '/rentals/1/2')
				.then(() => expect(httpRequest(HTTP.GET, '/rentals/1/2')).resolves.toEqual([]));
		});
	});
});