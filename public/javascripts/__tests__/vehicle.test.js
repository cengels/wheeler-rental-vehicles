const Car = require('../vehicles/Car.js');
const Truck = require('../vehicles/Truck.js');

describe('Vehicle Tests', () => {
    const car = new Car('WHO-CARES-420', 60000, 27222, true);
    const carUnavailable = new Car('WHO-CARES-420', 60000, 27222, false);
    const truck = new Truck('WHO-CARES-420', 60000, 27222, 1500, true);
    const truckTooHeavy = new Truck('WHO-CARES-420', 60000, 27222, 2000, true);

    describe('Rent Price Tests', () => {
        it('asserts that renting a random car for 20 days and 3000km costs 2840€', () => {
            expect(car.getRentPrice(20, 3000)).toBe(2840);
        });
        it('asserts that renting a random truck for 20 days and 3000km costs 3240€', () => {
            expect(truck.getRentPrice(20, 3000)).toBe(3240);
        });
        it('asserts that renting a random truck past the weight threshold for 20 days and 3000km costs 3840€', () => {
            expect(truckTooHeavy.getRentPrice(20, 3000)).toBe(3840);
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
            expect(car.distanceSinceMaintenance).toBe(27222);
        });
        it('asserts availableForRent getter', () => {
            expect(car.availableForRent).toBeTruthy();
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
    });
    describe('Other Tests', () => {
        it('asserts that renting a car that is not available for rent throws an exception', () => {
            expect(() => {
                carUnavailable.getRentPrice(20, 3000)
            }).toThrow(Error);
        });
    });
});