export function applyThousandSeparator(number, segments) {
	const THOUSAND_SEPARATOR = ',';
	segments = segments === undefined ? [] : segments;
	number = number.toString();

	if (number.length <= 3) {
		segments.unshift(number);
		return segments.join(THOUSAND_SEPARATOR);
	}

	segments.unshift(number.substr(-3, 3));
	number = number.slice(0, -3);

	return applyThousandSeparator(number, segments);
}