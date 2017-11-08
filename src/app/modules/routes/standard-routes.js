const dbQuery = require('../db/queries');

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
                console.log(req.body.customerid);
                console.log(req.body.vehicleid);

                if (req.body.customerid === 'default' || req.body.vehicleid === 'default') {
                    showRentalForm(req, res, '<div class="hint-error">Please select both a customer and a vehicle.</div>');
                } else {
                    dbQuery.post.newRental(req.body.customerid, req.body.vehicleid, new Date().toISOString())
                        .then(() => showRentalForm(req, res, '<div class="hint-success">Successfully booked!</div>'))
                        .catch(() => showRentalForm(req, res, '<div class="hint-error">Oh no! An unknown error occurred. Please contact the administrator.</div>'));
                }
            })
        }
    }
};