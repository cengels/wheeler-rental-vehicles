// eslint-disable-line max-lines

const Status = require('../definitions/status');
const {
	makeGetRequest,
	makePostRequest,
	makeDeleteRequest
} = require('../modules/requests/Request');

const originalTables = {
	'colors': [
		{ 'colorid': 1, 'name': 'black' },
		{ 'colorid': 2, 'name': 'gray' },
		{ 'colorid': 3, 'name': 'silver' },
		{ 'colorid': 4, 'name': 'white' },
		{ 'colorid': 5, 'name': 'blue' },
		{ 'colorid': 6, 'name': 'red' },
		{ 'colorid': 7, 'name': 'green' },
		{ 'colorid': 8, 'name': 'pink' },
		{ 'colorid': 9, 'name': 'purple' },
		{ 'colorid': 10, 'name': 'brown' },
		{ 'colorid': 11, 'name': 'orange' },
		{ 'colorid': 12, 'name': 'yellow' }
	],

	'customers': [
		{
			'address': '6649 N Blue Gum St',
			'city': 'New Orleans',
			'customerid': 1,
			'customersince': '1999-01-08',
			'firstname': 'James',
			'lastname': 'Butt',
			'phonenumber': '504-621-8927',
			'postalcode': '70116'
		},
		{
			'address': '4 B Blue Ridge Blvd',
			'city': 'Brighton',
			'customerid': 2,
			'customersince': '2003-03-25',
			'firstname': 'Josephine',
			'lastname': 'Darakjy',
			'phonenumber': '810-292-9388',
			'postalcode': '48116'
		},
		{
			'address': '8 W Cerritos Ave #54',
			'city': 'Bridgeport',
			'customerid': 3,
			'customersince': '2004-12-11',
			'firstname': 'Art',
			'lastname': 'Venere',
			'phonenumber': '856-636-8749',
			'postalcode': '08014'
		},
		{
			'address': '639 Main St',
			'city': 'Anchorage',
			'customerid': 4,
			'customersince': '1998-05-05',
			'firstname': 'Lenna',
			'lastname': 'Paprocki',
			'phonenumber': '907-385-4412',
			'postalcode': '99501'
		}
	],

	'makes': [
		{ 'makeid': 1, 'name': 'Audi' },
		{ 'makeid': 2, 'name': 'BMW' },
		{ 'makeid': 3, 'name': 'Ferrari' },
		{ 'makeid': 4, 'name': 'Ford' },
		{ 'makeid': 5, 'name': 'Harley Davidson' },
		{ 'makeid': 6, 'name': 'Honda' },
		{ 'makeid': 7, 'name': 'Hyundai' },
		{ 'makeid': 8, 'name': 'Lamborghini' },
		{ 'makeid': 9, 'name': 'Mercedes-Benz' },
		{ 'makeid': 10, 'name': 'Mini' },
		{ 'makeid': 11, 'name': 'Nissan' },
		{ 'makeid': 12, 'name': 'Opel' },
		{ 'makeid': 13, 'name': 'Porsche' },
		{ 'makeid': 14, 'name': 'Tesla' },
		{ 'makeid': 15, 'name': 'Toyota' },
		{ 'makeid': 16, 'name': 'Volkswagen' }
	],

	'models': [
		{
			'makeid': 4,
			'maximumcargoload': null,
			'modelid': 1,
			'name': 'Model T',
			'typeid': 1
		},
		{
			'makeid': 16,
			'maximumcargoload': null,
			'modelid': 2,
			'name': 'Beetle',
			'typeid': 1
		},
		{
			'makeid': 15,
			'maximumcargoload': null,
			'modelid': 3,
			'name': 'Corolla',
			'typeid': 1
		},
		{
			'makeid': 4,
			'maximumcargoload': null,
			'modelid': 4,
			'name': 'Falcon',
			'typeid': 1
		},
		{
			'makeid': 16,
			'maximumcargoload': null,
			'modelid': 5,
			'name': 'Gol',
			'typeid': 1
		},
		{
			'makeid': 16,
			'maximumcargoload': null,
			'modelid': 6,
			'name': 'Santana',
			'typeid': 1
		},
		{
			'makeid': 16,
			'maximumcargoload': null,
			'modelid': 7,
			'name': 'Golf',
			'typeid': 1
		},
		{
			'makeid': 4,
			'maximumcargoload': 11793,
			'modelid': 8,
			'name': 'E-650',
			'typeid': 2
		},
		{
			'makeid': 4,
			'maximumcargoload': 14969,
			'modelid': 9,
			'name': 'F-750',
			'typeid': 2
		},
		{
			'makeid': 15,
			'maximumcargoload': 508,
			'modelid': 10,
			'name': 'Tacoma Limited',
			'typeid': 2
		}
	],

	'rentals': [
		{
			'customerid': 1,
			'milesdriven': null,
			'rentedsince': '2017-05-11',
			'returndate': null,
			'vehicleid': 3
		},
		{
			'customerid': 3,
			'milesdriven': 150,
			'rentedsince': '2017-09-22',
			'returndate': '2017-11-21',
			'vehicleid': 4
		},
		{
			'customerid': 4,
			'milesdriven': 50,
			'rentedsince': '2017-11-01',
			'returndate': '2017-12-05',
			'vehicleid': 5
		},
		{
			'customerid': 1,
			'milesdriven': null,
			'rentedsince': '2017-09-05',
			'returndate': null,
			'vehicleid': 1
		}
	],

	'types': [
		{ 'name': 'Car', 'typeid': 1 },
		{ 'name': 'Truck', 'typeid': 2 },
		{ 'name': 'Motorcycle', 'typeid': 3 }
	],

	'vehicles': [
		{
			'available': true,
			'colorid': 4,
			'licenseplate': '2FAST4U',
			'mileage': 25000,
			'milessincemaintenance': 3000,
			'modelid': 2,
			'vehicleid': 1,
			'year': 1996
		},
		{
			'available': false,
			'colorid': 1,
			'licenseplate': 'KID 507',
			'mileage': 23999,
			'milessincemaintenance': 4539,
			'modelid': 1,
			'vehicleid': 2,
			'year': 2004
		},
		{
			'available': true,
			'colorid': 1,
			'licenseplate': 'ADD 09',
			'mileage': 1521,
			'milessincemaintenance': 1521,
			'modelid': 5,
			'vehicleid': 3,
			'year': 2009
		},
		{
			'available': true,
			'colorid': 7,
			'licenseplate': 'SDU-582',
			'mileage': 27003,
			'milessincemaintenance': 19000,
			'modelid': 8,
			'vehicleid': 4,
			'year': 2000
		},
		{
			'available': true,
			'colorid': 5,
			'licenseplate': 'DSU-285',
			'mileage': 52021,
			'milessincemaintenance': 14999,
			'modelid': 10,
			'vehicleid': 5,
			'year': 2014
		},
		{
			'available': true,
			'colorid': 2,
			'licenseplate': 'AVG-512',
			'mileage': 27003,
			'milessincemaintenance': 19000,
			'modelid': 3,
			'vehicleid': 6,
			'year': 1999
		},
		{
			'available': true,
			'colorid': 6,
			'licenseplate': 'DTS-G32',
			'mileage': 52021,
			'milessincemaintenance': 14999,
			'modelid': 4,
			'vehicleid': 7,
			'year': 1998
		}
	]
};

describe('Integration Tests', () => {
	// eslint-disable-next-line max-statements
	describe('GET Tests', () => {
		it('GET: all colors', () => {
			expect.assertions(1);
			return expect(makeGetRequest('/colors'))
				.resolves.toEqual(originalTables.colors);
		});
		it('GET: single color', () => {
			expect.assertions(1);
			return expect(makeGetRequest('/colors/5'))
				.resolves.toEqual([originalTables.colors[4]]);
		});
		it('GET: all makes', () => {
			expect.assertions(1);
			return expect(makeGetRequest('/makes'))
				.resolves.toEqual(originalTables.makes);
		});
		it('GET: single make', () => {
			expect.assertions(1);
			return expect(makeGetRequest('/makes/3'))
				.resolves.toEqual([originalTables.makes[2]]);
		});
		it('GET: all types', () => {
			expect.assertions(1);
			return expect(makeGetRequest('/types'))
				.resolves.toEqual(originalTables.types);
		});
		it('GET: single type', () => {
			expect.assertions(1);
			return expect(makeGetRequest('/types/2'))
				.resolves.toEqual([originalTables.types[1]]);
		});
		it('GET: all models', () => {
			expect.assertions(1);
			return expect(makeGetRequest('/models'))
				.resolves.toEqual(originalTables.models);
		});
		it('GET: single model', () => {
			expect.assertions(1);
			return expect(makeGetRequest('/models/5'))
				.resolves.toEqual([originalTables.models[4]]);
		});
		it('GET: all customers', () => {
			expect.assertions(1);
			return expect(makeGetRequest('/customers'))
				.resolves.toEqual(originalTables.customers);
		});
		it('GET: single customer', () => {
			expect.assertions(1);
			return expect(makeGetRequest('/customers/3'))
				.resolves.toEqual([originalTables.customers[2]]);
		});
		it('GET: all vehicles', () => {
			expect.assertions(1);
			return expect(makeGetRequest('/vehicles'))
				.resolves.toEqual(originalTables.vehicles);
		});
		it('GET: single vehicle', () => {
			expect.assertions(1);
			return expect(makeGetRequest('/vehicles/1'))
				.resolves.toEqual([originalTables.vehicles[0]]);
		});
		it('GET: all rentals', () => {
			expect.assertions(1);
			return expect(makeGetRequest('/rentals'))
				.resolves.toEqual(originalTables.rentals);
		});
		it('GET: single rental through both customerId and vehicleId', () => {
			expect.assertions(1);
			return expect(makeGetRequest('/rentals/1/3'))
				.resolves.toEqual([originalTables.rentals[0]]);
		});
		it('GET: all rentals from one customer', () => {
			expect.assertions(1);
			return expect(makeGetRequest('/rentals?customerid=1'))
				.resolves.toEqual([
					originalTables.rentals[0],
					originalTables.rentals[3]
				]);
		});
	});

	describe('POST Tests', () => {
		it('POST: adding a new color', () => {
			const dataObject = { 'name': 'turquoise' };
			const expectedDataObject = Object.assign(
				{},
				{ 'colorid': 13 },
				dataObject
			);
			expect.assertions(1);
			return makePostRequest('/colors', dataObject)
				.then(() => expect(makeGetRequest('/colors/13'))
					.resolves.toEqual([expectedDataObject]));
		});
		it('POST: adding a new make', () => {
			const dataObject = { 'name': 'Citroen' };
			const expectedDataObject = Object.assign(
				{},
				{ 'makeid': 17 },
				dataObject
			);
			expect.assertions(1);
			return makePostRequest('/makes', dataObject)
				.then(() => expect(makeGetRequest('/makes/17'))
					.resolves.toEqual([expectedDataObject]));
		});
		it('POST: adding a new type', () => {
			const dataObject = { 'name': 'Scooter' };
			const expectedDataObject = Object.assign(
				{},
				{ 'typeid': 4 },
				dataObject
			);
			expect.assertions(1);
			return makePostRequest('/types', dataObject)
				.then(() => expect(makeGetRequest('/types/4'))
					.resolves.toEqual([expectedDataObject]));
		});
		it('POST: adding a new model', () => {
			const dataObject = {
				'makeid': 17,
				'name': 'C4',
				'typeid': 1
			};
			const expectedDataObject = Object.assign(
				{},
				{
					'maximumcargoload': null,
					'modelid': 11
				},
				dataObject
			);
			expect.assertions(1);
			return makePostRequest('/models', dataObject)
				.then(() => expect(makeGetRequest('/models/11'))
					.resolves.toEqual([expectedDataObject]));
		});
		it('POST: adding a new customer', () => {
			const dataObject = {
				'address': '42 S Solling Str.',
				'city': 'Sollingen',
				'customersince': '2004-12-11',
				'firstname': 'Markus',
				'lastname': 'Mustermann',
				'phonenumber': '214-552-1233',
				'postalcode': '41224'
			};
			const expectedDataObject = Object.assign(
				{},
				{ 'customerid': 5 },
				dataObject
			);
			expect.assertions(1);
			return makePostRequest('/customers', dataObject)
				.then(() => expect(makeGetRequest('/customers/5'))
					.resolves.toEqual([expectedDataObject]));
		});
		it('POST: adding a new vehicle', () => {
			const dataObject = {
				'available': false,
				'colorid': 7,
				'licenseplate': 'Y-U-MAD',
				'mileage': 22121,
				'milessincemaintenance': 8512,
				'modelid': 6,
				'year': 2015
			};
			const expectedDataObject = Object.assign(
				{},
				{ 'vehicleid': 8 },
				dataObject
			);
			expect.assertions(1);
			return makePostRequest('/vehicles', dataObject)
				.then(() => expect(makeGetRequest('/vehicles/8'))
					.resolves.toEqual([expectedDataObject]));
		});
		it('POST: adding a new rental', () => {
			const dataObject = {
				'customerid': 4,
				'milesdriven': null,
				'rentedsince': '2017-11-02',
				'returndate': null,
				'vehicleid': 6
			};

			expect.assertions(1);
			return makePostRequest('/rentals', dataObject)
				.then(() => expect(makeGetRequest('/rentals/4/6'))
					.resolves.toEqual([dataObject]));
		});
	});

	describe('DELETE Tests', () => {
		it('DELETE: deleting a color', () => {
			expect.assertions(1);
			return makeDeleteRequest('/colors/10')
				.then(() => expect(makeGetRequest('/colors/10'))
					.resolves.toEqual([]));
		});
		it('DELETE: deleting a make', () => {
			expect.assertions(1);
			return makeDeleteRequest('/makes/12')
				.then(() => expect(makeGetRequest('/makes/12'))
					.resolves.toEqual([]));
		});
		it('DELETE: deleting a type', () => {
			expect.assertions(1);
			return makeDeleteRequest('/types/3')
				.then(() => expect(makeGetRequest('/types/3'))
					.resolves.toEqual([]));
		});
		it('DELETE: deleting a model', () => {
			expect.assertions(1);
			return makeDeleteRequest('/models/7')
				.then(() => expect(makeGetRequest('/models/7'))
					.resolves.toEqual([]));
		});
		it('DELETE: deleting a customer', () => {
			expect.assertions(1);
			return makeDeleteRequest('/customers/1')
				.then(() => expect(makeGetRequest('/customers/1'))
					.resolves.toEqual([]));
		});
		it('DELETE: deleting a vehicle', () => {
			expect.assertions(1);
			return makeDeleteRequest('/vehicles/3')
				.then(() => expect(makeGetRequest('/vehicles/3'))
					.resolves.toEqual([]));
		});
		it('DELETE: deleting a rental', () => {
			expect.assertions(1);
			return makeDeleteRequest('/rentals/1/2')
				.then(() => expect(makeGetRequest('/rentals/1/2'))
					.resolves.toEqual([]));
		});
	});
	describe('Error Handling', () => {
		it('DELETE: returns error when attempting to delete key in use', () => {
			expect.assertions(1);
			return makeDeleteRequest('/models/8')
				.catch(err => expect(err.statusCode)
					.toEqual(Status.BAD_REQUEST));
		});
	});
});