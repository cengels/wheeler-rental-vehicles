const RequestHandler = require('./RequestHandler');
const { makePostRequest } = require('./Request');

class CustomerRequestHandler extends RequestHandler {
	constructor(res, viewObject, requestBody) {
		super(res, viewObject);

		this._requestBody = CustomerRequestHandler._buildRequestBody(requestBody);
	}

	renderCustomerForm(hint) {
		this._renderForm({}, { hint: hint });
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
		const postBody = RequestHandler._processRequestBody(this._requestBody);
		postBody.customersince = new Date().toISOString();

		return makePostRequest('/customers', postBody);
	}

	static _buildRequestBody(requestBody) {
		return {
			firstName: {
				value: requestBody['first-name'],
				canBeNull: false
			},
			lastName: {
				value: requestBody['last-name'],
				canBeNull: false
			},
			postalCode: {
				value: requestBody['postal-code'],
				canBeNull: false
			},
			address: {
				value: requestBody.address,
				canBeNull: false
			},
			city: {
				value: requestBody.city,
				canBeNull: false
			},
			phoneNumber: {
				value: requestBody['phone-number'],
				canBeNull: true
			}
		};
	}
}

module.exports = CustomerRequestHandler;