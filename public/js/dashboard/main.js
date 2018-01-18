import $ from 'jquery';
import spinner from './modules/spinner';
import Tabs from './modules/tabs';

function updateActiveTab(newActiveTab) {
	$('.tab').removeClass('active');
	$(newActiveTab).addClass('active');
}

function showTab(tabId) {
	switch (tabId) {
		case 'overview-tab':
			Tabs.Overview.render()
				.done(() => spinner.stop());
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

function tabClickHandler() {
	const tabId = $(this).attr('id');

	updateActiveTab(this);
	showTab(tabId);
}

$(document).ready(() => {
	$('.tab').click(tabClickHandler);

	spinner.start();
	Tabs.Overview.render()
		.done(() => spinner.stop());
});