const Pages = {
	spin: () => {
		const spinner = $('<div class="spinner">Loading...</div>');
		$('#content').append(spinner);
	},

	show: () => {
		$('.spinner').remove();
		$('.super-section').css('opacity', 1);
	}
};

function updateActiveTab(newActiveTab) {
	$('.tab').removeClass('active');
	$(newActiveTab).addClass('active');
}

function showTab(tabId) {
	switch (tabId) {
		case 'overview-tab':
			Pages.Overview.render();
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

$(document).ready(() => {
	$('.tab').click(function() {
		const tabId = $(this).attr('id');

		updateActiveTab(this);
		showTab(tabId);
	});

	Pages.spin();
	Pages.Overview.render();
});