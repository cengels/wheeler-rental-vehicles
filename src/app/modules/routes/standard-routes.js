const dbQuery = require('../db/queries');
const Status = require('../../definitions/status');

const showRentalForm = (req, res, hint) => {
    const options = {
        data: {
            vehicles: dbQuery.get.availableVehicles(),
            customers: dbQuery.get.allCustomers()
        },
        partials: {
            hint: hint || ''
        }
    };

    res.render('rental-form', options);
};

module.exports = (router) => {
    return {
        rentalForm: (route) => {
            router.get(route, (req, res) => showRentalForm(req, res));

            router.post(route, (req, res) => {
                if (req.body.customerid === 'default' || req.body.vehicleid === 'default') {
                    showRentalForm(req, res, `<div class="hint-error">${Status.Errors.RentalForm.EMPTY_FIELDS}</div>`);
                } else {
                    dbQuery.post.newRental(req.body.customerid, req.body.vehicleid, new Date().toISOString())
                        .then(() => showRentalForm(req, res, `<div class="hint-success">${Status.Success.RENTAL_FORM}</div>`))
                        .catch(() => showRentalForm(req, res, `<div class="hint-error">${Status.Errors.UNKNOWN}</div>`));
                }
            })
        }
    }
};