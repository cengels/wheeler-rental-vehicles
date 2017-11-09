const dbQuery = require('../../db/queries');
const Status = require('../../../definitions/status');
const logger = require('../../Logger')(module.id);

const showRentalForm = (req, res, route, hint) => {
    const options = {
        data: {
            vehicles: dbQuery.get.all.availableVehicles()._result.rows,
            customers: dbQuery.get.all.customers()._result.rows
        },
        partials: {
            hint: hint || '',
            route: route
        }
    };

    res.render('rental-form', options);
};

module.exports = (router, route) => {
    router.get(route, (req, res) => showRentalForm(req, res, route));

    router.post(route, (req, res) => {
        if (req.body.customerid === 'default' || req.body.vehicleid === 'default') {
            logger.userError('Error posting new rental from rental-form. Invalid parameters.', req.body);
            showRentalForm(req, res, route, `<div class="hint-error">${Status.Errors.RentalForm.EMPTY_FIELDS}</div>`);
        } else {
            dbQuery.post.newRental(req.body.customerid, req.body.vehicleid, new Date().toISOString())
                .then(() => {
                    logger.info('Successfully posted new rental from rental-form.', req.body);
                    showRentalForm(req, res, route, `<div class="hint-success">${Status.Success.RENTAL_FORM}</div>`)
                })
                .catch((err) => {
                    logger.serverError('Error posting new rental from rental-form.', err, req.body);
                    showRentalForm(req, res, route, `<div class="hint-error">${Status.Errors.UNKNOWN}</div>`);
                });
        }
    })
};