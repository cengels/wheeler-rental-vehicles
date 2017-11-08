const dbQuery = require('../db/queries');

module.exports = (router) => {
    return {
        rentalForm: (route) => {
            router.get(route, (req, res) => {
                res.render('rental-form', {
                    data: {
                        vehicles: dbQuery.get.availableVehicles(),
                        customers: dbQuery.get.allCustomers()
                    },
                    helpers: {
                        postRental: dbQuery.post.newRental
                    }
                });
            });
        }
    }
};