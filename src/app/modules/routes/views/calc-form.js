const dbQuery = require('../../db/queries');
const Status = require('../../../definitions/status');
const logger = require('../../Logger')(module.id);
const Car = require('../../vehicles/Car');
const Truck = require('../../vehicles/Truck');

const showCalcForm = (req, res, route, price, hint) => {
    const options = {
        data: {
            vehicles: dbQuery.get.allVehicles()
        },
        partials: {
            hint: hint || '',
            route: route,
            price: price || ''
        }
    };

    res.render('rental-calc', options);
};

const newVehicleInstance = (vehicle) => {
    const { typeid, licenseplate, mileage, milessincemaintenance, maximumcargoload, available } = vehicle;

    if (dbQuery.get.vehicleType(typeid) === 'Truck') {
        return new Truck(licenseplate, mileage, milessincemaintenance, maximumcargoload, available);
    } else {
        return new Car(licenseplate, mileage, milessincemaintenance, available);
    }
};

module.exports = (router, route) => {
    router.get(route, (req, res) => showCalcForm(req, res, route));

    router.post(route, (req, res) => {
        try {
            const { vehicle, days, distance } = req.body;
            const vehicleInstance = newVehicleInstance(vehicle);
            const rentPrice = vehicleInstance.getRentPrice(days, distance);

            showCalcForm(req, res, route, rentPrice);
        } catch (err) {
            logger.serverError('Error getting and posting calcPriceView result.', err, req.body);
            showCalcForm(req, res, route, '', `<div class="hint-error">${Status.Errors.UNKNOWN}</div>`);
        }
    });
};