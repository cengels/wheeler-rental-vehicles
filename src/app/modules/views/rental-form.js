const Status = require('../../definitions/status-messages');
const RentRequestHandler = require('../requests/RentRequestHandler');

module.exports = (router, viewObject) => {
	router.get(viewObject.route, (req, res) => {
		const rentGetRequest = new RentRequestHandler(res, viewObject, req.body);

		rentGetRequest.renderRentForm();
	});

	router.post(viewObject.route, (req, res) => {
		const rentPostRequest = new RentRequestHandler(res, viewObject, req.body);

		if (rentPostRequest.inputIsValid()) {
			rentPostRequest.postRental()
				.then(() => rentPostRequest.renderRentSuccess('Successfully posted new rental from rental-form.'))
				.catch((err) => rentPostRequest.renderRentError(Status.Errors.UNKNOWN,
					'Error posting new rental from rental-form.', err.stack));
		} else {
			rentPostRequest.renderRentError(Status.Errors.RentalForm.EMPTY_FIELDS,
				'Error posting new rental from rental-form. Invalid parameters.');
		}
	});
};