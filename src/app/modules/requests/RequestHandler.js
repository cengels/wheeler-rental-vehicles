const logger = require('../Logger')(module.id);

class RequestHandler {
	constructor(res, viewObject, requestBody) {
		this._res = res;
		this._viewObject = viewObject;
		this._requestBody = requestBody;
	}

	generateSuccessHint(successHint) {
		logger.info(successHint, this._requestBody);
		return RequestHandler._generateHint('hint-success', successHint);
	}

	generateErrorHint(errorHint, logMessage, err) {
		logger.userError(logMessage, err ? err : '', this._requestBody);
		return RequestHandler._generateHint('hint-error', errorHint);
	}

	inputIsValid() {
		return Object.values(this._requestBody).every(obj => obj.canBeNull || obj.value !== '');
	}

	_renderForm(responseBody, hintObject) {
		let targetView = this._viewObject.name;
		let targetRoute = this._viewObject.route;
		let partialsObject;

		if (hintObject) {
			partialsObject = hintObject;

			if (!hintObject.hint) {
				partialsObject.hint = '';
			}
		}

		responseBody.route = targetRoute;

		this._res.render(targetView, { data: responseBody, partials: partialsObject });
	}

	static _generateHint(className, errorHint) {
		return `<div class="${className}">${errorHint}</div>`;
	}

	static _processRequestBody(requestBody) {
		return Object.keys(requestBody).reduce((object, key) => {
			object[key] = requestBody[key].value;
			return object;
		}, {});
	}
}

module.exports = RequestHandler;