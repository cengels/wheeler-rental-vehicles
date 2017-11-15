const Car = require('../modules/vehicles/Car');
const Truck = require('../modules/vehicles/Truck');

describe('Vehicle Tests', () => {
	const car = new Car('WHO-CARES-420', 60000, 12000, true);
	const carMaintenanceThreshold = new Car('WHO-CARES-420', 60000, 29000, true);
	const truck = new Truck('WHO-CARES-420', 60000, 12000, 1500, true);
	const truckTooHeavy = new Truck('WHO-CARES-420', 60000, 12000, 2000, true);

	describe('Rent Price Tests', () => {
		it('asserts that renting a random car for 20 days and 3000km costs 2340€', () => {
			expect(car.getRentPrice(20, 3000)).toBe(2340);
		});
		it('asserts that renting a random car for 20 days and 3000km costs 2340€ minus 500€ maintenance', () => {
			expect(carMaintenanceThreshold.getRentPrice(20, 3000)).toBe(1840);
		});
		it('asserts that renting a random truck for 20 days and 3000km costs 2740€', () => {
			expect(truck.getRentPrice(20, 3000)).toBe(2740);
		});
		it('asserts that renting a random truck past the weight threshold for 20 days and 3000km costs 3340€', () => {
			expect(truckTooHeavy.getRentPrice(20, 3000)).toBe(3340);
		});
	});
	describe('Getter Tests', () => {
		it('asserts license plate getter', () => {
			expect(car.licensePlate).toBe('WHO-CARES-420');
		});
		it('asserts mileage getter', () => {
			expect(car.mileage).toBe(60000);
		});
		it('asserts distanceSinceMaintenance getter', () => {
			expect(car.distanceSinceMaintenance).toBe(12000);
		});
		it('asserts availableForRent getter', () => {
			expect(car.availableForRent).toBeTruthy();
		});
		it('asserts maxCargoLoad getter', () => {
			expect(truck.maxCargoLoad).toBe(1500);
		});
	});
	describe('Setter Tests', () => {
		it('asserts that car will obtain new license plate', () => {
			car.licensePlate = '123-FOOBAR';
			expect(car.licensePlate).toBe('123-FOOBAR');
		});
		it('asserts that car will obtain new mileage', () => {
			car.mileage = 62000;
			expect(car.mileage).toBe(62000);
		});
		it('asserts that car will obtain new distanceSinceMaintenance', () => {
			car.distanceSinceMaintenance = 30000;
			expect(car.distanceSinceMaintenance).toBe(30000);
		});
		it('asserts that car will be set to unavailable for rent', () => {
			car.availableForRent = false;
			expect(car.availableForRent).toBeFalsy();
		});
		it('asserts that truck will obtain new maxCargoLoad', () => {
			truck.maxCargoLoad = 1600;
			expect(truck.maxCargoLoad).toBe(1600);
		});
	});
});