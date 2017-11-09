const dbQuery = require('../../db/queries');
const Status = require('../../../definitions/status');
const logger = require('../../Logger')(module.id);
const Car = require('../../vehicles/Car');
const Truck = require('../../vehicles/Truck');

const showCalcForm = (req, res, route, price, hint) => {
    const options = {
        data: {
            vehicles: dbQuery.get.all.vehicles()._result.rows
        },
        partials: {
            hint: hint || '',
            route: route,
            price: price || ''
        }
    };

    res.render('calc-form', options);
};

const newVehicleInstance = (vehicle) => {
    const { modelid, licenseplate, mileage, milessincemaintenance, maximumcargoload, available } = vehicle;

    return dbQuery.get.only.model(modelid)
        .then((res) => dbQuery.get.only.type(res.rows[0].typeid))
        .then((res) => {
            if (res.rows[0].name === 'Truck') {
                return new Truck(licenseplate, mileage, milessincemaintenance, maximumcargoload, available);
            } else {
                return new Car(licenseplate, mileage, milessincemaintenance, available);
            }
        }).catch((err) => {
            logger.serverError('Error constructing vehicle object.', err);
        });
};

module.exports = (router, route) => {
    router.get(route, (req, res) => showCalcForm(req, res, route));

    router.post(route, (req, res) => {
        if (req.body.vehicleid === 'default' || req.body.days === '' || req.body.distance === '') {
            logger.userError('Error calculating price. Invalid parameters.', req.body);
            showCalcForm(req, res, route, '', `<div class="hint-error">${Status.Errors.CalcForm.EMPTY_FIELDS}</div>`);
        } else {
            const { vehicleid, days, distance } = req.body;
            dbQuery.get.only.vehicle(vehicleid)
                .then((res) => newVehicleInstance(res.rows[0]))
                .then((vehicleInstance) => {
                    const rentPrice = vehicleInstance.getRentPrice(days, distance);
                    showCalcForm(req, res, route, rentPrice.toFixed(2).toString())
                })
                .catch((err) => {
                    logger.serverError('Error calculating price.', err, req.body);
                    showCalcForm(req, res, route, '', `<div class="hint-error">${Status.Errors.UNKNOWN}</div>`);
                })
        }
    });
};