const Status = require('../../definitions/status-messages');
const CalcRequestHandler = require('../requests/CalcRequestHandler');

module.exports = (router, viewObject) => {
	router.get(viewObject.route, (req, res) => {
		const calcGetRequest = new CalcRequestHandler(
			res,
			viewObject,
			req.body
		);

		calcGetRequest.renderCalcForm();
	});

	router.post(viewObject.route, (req, res) => {
		const calcPostRequest = new CalcRequestHandler(
			res,
			viewObject,
			req.body
		);

		if (calcPostRequest.inputIsValid()) {
			calcPostRequest.renderPrice();
		} else {
			calcPostRequest.renderCalcError(
				Status.Errors.EMPTY_FIELDS,
				'Error calculating price. Invalid parameters.'
			);
		}
	});
};