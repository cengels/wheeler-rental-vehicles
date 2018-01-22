import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './modules/components/Dashboard';

$(document).ready(() => {
	ReactDOM.render(<Dashboard/>, document.getElementById('page-container'));

	// spinner.start();
	// Tabs.Overview.render()
	// 	.done(() => spinner.stop());
});