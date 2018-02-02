const RequestHandler = require('./RequestHandler');
const { makePostRequest } = require('./Request');

class CustomerRequestHandler extends RequestHandler {
	constructor(res, viewObject, requestBody) {
		super(res, viewObject);

		this._requestBody = CustomerRequestHandler
			.buildRequestBody(requestBody);
	}

	renderCustomerForm(hint) {
		this._renderForm({}, { hint });
	}

	renderCustomerError(errorHint, logMessage, err) {
		const hint = this.generateErrorHint(errorHint, logMessage, err);
		this.renderCustomerForm(hint);
	}

	renderCustomerSuccess(successHint) {
		const hint = this.generateSuccessHint(successHint);
		this.renderCustomerForm(hint);
	}

	postCustomer() {
		const postBody = RequestHandler.processRequestBody(this._requestBody);
		postBody.customersince = new Date().toISOString();

		return makePostRequest('/customers', postBody);
	}

	static buildRequestBody(requestBody) {
		return {
			'address': {
				'canBeNull': false,
				'value': requestBody.address
			},
			'city': {
				'canBeNull': false,
				'value': requestBody.city
			},
			'firstName': {
				'canBeNull': false,
				'value': requestBody['first-name']
			},
			'lastName': {
				'canBeNull': false,
				'value': requestBody['last-name']
			},
			'phoneNumber': {
				'canBeNull': true,
				'value': requestBody['phone-number']
			},
			'postalCode': {
				'canBeNull': false,
				'value': requestBody['postal-code']
			}
		};
	}
}

module.exports = CustomerRequestHandler;