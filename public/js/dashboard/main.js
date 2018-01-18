import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import spinner from './modules/spinner';
import Dashboard from './modules/components/dashboard';
import OverviewTab from './modules/components/tabs/overview';

function updateActiveTab(newActiveTab) {
	$('.tab').removeClass('active');
	$(newActiveTab).addClass('active');
}

function showTab(tabId) {
	switch (tabId) {
		case 'overview-tab':
			ReactDOM.render(<OverviewTab/>, document.getElementById('content'));
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

	ReactDOM.render(<Dashboard/>, document.getElementById('page-container'));

	// spinner.start();
	// Tabs.Overview.render()
	// 	.done(() => spinner.stop());
});