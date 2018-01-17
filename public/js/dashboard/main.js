function updateActiveTab(newActiveTab) {
	$('.tab').removeClass('active');
	$(newActiveTab).addClass('active');
}

function showTab(tabId) {
	switch (tabId) {
		case 'overview-tab':
			break;
		case 'vehicles-tab':
			break;
		case 'locations-tab':
			break;
		case 'customers-tab':
			break;
		case 'employees-tab':
			break;
		case 'statistics-tab':
			break;
		case 'preferences-tab':
			break;
		case 'about-tab':
			break;
		default:
			// TODO: error page?
	}
}

$('.tab').click(function() {
	const tabId = $(this).attr('id');

	updateActiveTab(this);
	showTab(tabId);
});