const Car = require('../modules/vehicles/Car');
const Truck = require('../modules/vehicles/Truck');

// eslint-disable-next-line max-statements
describe('Vehicle Tests', () => {
	const LICENSE_PLATE = 'WHO-CARES-420';
	const MILEAGE = 60000;
	const LOW_CARGO_LOAD = 1500;
	const HIGH_CARGO_LOAD = 2000;
	const LOW_MILES_SINCE_MAINTENANCE = 12000;
	const HIGH_MILES_SINCE_MAINTENANCE = 29000;

	const car = new Car({
		'availableForRent': true,
		'licensePlate': LICENSE_PLATE,
		'mileage': MILEAGE,
		'milesSinceMaintenance': LOW_MILES_SINCE_MAINTENANCE
	});

	const carMaintenanceThreshold = new Car({
		'availableForRent': true,
		'licensePlate': LICENSE_PLATE,
		'mileage': MILEAGE,
		'milesSinceMaintenance': HIGH_MILES_SINCE_MAINTENANCE
	});

	const truck = new Truck({
		'availableForRent': true,
		'cargoLoad': LOW_CARGO_LOAD,
		'licensePlate': LICENSE_PLATE,
		'mileage': MILEAGE,
		'milesSinceMaintenance': LOW_MILES_SINCE_MAINTENANCE
	});

	const truckTooHeavy = new Truck({
		'availableForRent': true,
		'cargoLoad': HIGH_CARGO_LOAD,
		'licensePlate': LICENSE_PLATE,
		'mileage': MILEAGE,
		'milesSinceMaintenance': LOW_MILES_SINCE_MAINTENANCE
	});

	describe('Rent Price Tests', () => {
		const DAYS = 20;
		const MILES = 3000;

		it('asserts that Car getRentPrice() works', () => {
			const RETURN_PRICE = 2340;

			expect(car.getRentPrice(DAYS, MILES)).toBe(RETURN_PRICE);
		});
		it('asserts that Car getMaintenancePrice() works', () => {
			const RETURN_PRICE = 2340;
			const MAINTENANCE_PRICE = 500;

			expect(carMaintenanceThreshold.getRentPrice(DAYS, MILES))
				.toBe(RETURN_PRICE);
			expect(carMaintenanceThreshold.getMaintenancePrice(MILES))
				.toBe(MAINTENANCE_PRICE);
		});
		it('asserts that Truck getRentPrice() works', () => {
			const RETURN_PRICE = 2740;

			expect(truck.getRentPrice(DAYS, MILES)).toBe(RETURN_PRICE);
		});
		it('asserts that Truck getRentPrice() past weight limit works', () => {
			const RETURN_PRICE = 3340;

			expect(truckTooHeavy.getRentPrice(DAYS, MILES)).toBe(RETURN_PRICE);
		});
	});
	describe('Getter Tests', () => {
		it('asserts license plate getter', () => {
			expect(car.licensePlate).toBe(LICENSE_PLATE);
		});
		it('asserts mileage getter', () => {
			expect(car.mileage).toBe(MILEAGE);
		});
		it('asserts milesSinceMaintenance getter', () => {
			expect(car.milesSinceMaintenance)
				.toBe(LOW_MILES_SINCE_MAINTENANCE);
		});
		it('asserts availableForRent getter', () => {
			expect(car.availableForRent).toBeTruthy();
		});
		it('asserts maxCargoLoad getter', () => {
			expect(truck.maxCargoLoad).toBe(LOW_CARGO_LOAD);
		});
	});
	describe('Setter Tests', () => {
		it('asserts that car will obtain new license plate', () => {
			const THIS_LICENSE_PLATE = '123-FOOBAR';

			car.licensePlate = THIS_LICENSE_PLATE;
			expect(car.licensePlate).toBe(THIS_LICENSE_PLATE);
		});
		it('asserts that car will obtain new mileage', () => {
			const THIS_MILEAGE = 62000;

			car.mileage = THIS_MILEAGE;
			expect(car.mileage).toBe(THIS_MILEAGE);
		});
		it('asserts that car will obtain new milesSinceMaintenance', () => {
			const THIS_DIST_SINCE = 30000;

			car.milesSinceMaintenance = THIS_DIST_SINCE;
			expect(car.milesSinceMaintenance).toBe(THIS_DIST_SINCE);
		});
		it('asserts that car will be set to unavailable for rent', () => {
			car.availableForRent = false;
			expect(car.availableForRent).toBeFalsy();
		});
		it('asserts that truck will obtain new maxCargoLoad', () => {
			const THIS_CARGO_LOAD = 1600;

			truck.maxCargoLoad = THIS_CARGO_LOAD;
			expect(truck.maxCargoLoad).toBe(THIS_CARGO_LOAD);
		});
	});
});