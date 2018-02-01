/**
 * Returns a number as a string with thousand separators.
 * @param {number|string} number - The number to be converted
 * @param {Array} segments - The three-digit segments.
 * No input parameter; only used for recursion
 * @returns {string} The input number with a comma inserted every three digits
 */
export function applyThousandSeparator(number, segments = []) {
	const THOUSAND_SEPARATOR = ',';
	const NUMBER_OF_DIGITS = 3;
	let numberString = typeof number === 'string'
		? number
		: number.toString();

	if (numberString.length <= NUMBER_OF_DIGITS) {
		segments.unshift(numberString);
		return segments.join(THOUSAND_SEPARATOR);
	}

	segments.unshift(numberString.substr(-NUMBER_OF_DIGITS, NUMBER_OF_DIGITS));
	numberString = numberString.slice(0, -NUMBER_OF_DIGITS);

	return applyThousandSeparator(numberString, segments);
}