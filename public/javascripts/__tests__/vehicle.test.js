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
    describe('Other Tests', () => {
        it('asserts that renting a car that is not available for rent throws an exception', () => {
            expect(() => {
                carUnavailable.getRentPrice(20, 3000)
            }).toThrow(Error);
        });
    });
});