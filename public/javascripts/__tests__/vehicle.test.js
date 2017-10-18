const Car = require('../vehicles/Car.js');

describe('Vehicle Tests', () => {
    const randomCar = new Car('WHO-CARES-420', 60000, 27222, true);
    const randomCarUnavailable = new Car('WHO-CARES-420', 60000, 27222, false);

    describe('Rent Price Tests', () => {
        it('asserts that renting a random car for 20 days and 3000km costs 2840€', () => {
            expect(randomCar.getRentPrice(20, 3000)).toBe(2840);
        });
    });
    describe('Other Tests', () => {
        it('asserts that renting a car that is not available for rent throws an exception', () => {
            expect(() => {
                randomCarUnavailable.getRentPrice(20, 3000)
            }).toThrow(Error);
        });
    });
});