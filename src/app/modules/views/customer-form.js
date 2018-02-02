const Status = require('../../definitions/status-messages');
const CustomerRequestHandler = require('../requests/CustomerRequestHandler');

module.exports = (router, viewObject) => {
	router.get(viewObject.route, (req, res) => {
		const customerGetRequest = new CustomerRequestHandler(
			res,
			viewObject,
			req.body
		);

		customerGetRequest.renderCustomerForm();
	});

	router.post(viewObject.route, (req, res) => {
		const customerPostRequest = new CustomerRequestHandler(
			res,
			viewObject,
			req.body
		);

		if (customerPostRequest.inputIsValid()) {
			customerPostRequest.postCustomer()
				.then(() => customerPostRequest
					.renderCustomerSuccess(Status.Success.SUCCESS))
				.catch(() => customerPostRequest.renderCustomerError(
					Status.Errors.UNKNOWN,
					'Error posting new customer from customer-form.'
				));
		} else {
			customerPostRequest.renderCustomerError(
				Status.Errors.EMPTY_FIELDS,
				'Error adding customer. Invalid parameters.',
				req.body
			);
		}
	});
};