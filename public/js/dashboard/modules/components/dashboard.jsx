import React from 'react';
import OverviewTab from './tabs/overview';

export default class Dashboard extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div id="top-bar">
					<div id="page-logo">
						<a href="/dashboard">
							<img id="wheeler-logo" src="/public/images/wheeler-logo.png"/>
							<div id="wheeler-label">Wheeler</div>
						</a>
					</div>

					<div id="search-panel">
						<div id="search-bar">
							<i className="fa fa-search" aria-hidden="true"/>
							<input id="search-input" name="search-input" type="text" value=""
								   placeholder="Enter a license plate, a customer name, a location, ..."/>
						</div>
					</div>

					<div id="user-panel">
						<img id="user-picture" alt="profile-picture" src="/public/images/blank-profile-picture.png"/>
						<div id="user-info">
							<div id="user-name">Anonymous User</div>
							<div id="user-options">
								<span id="action-settings" className="account-action">Settings</span> •
								<span id="action-logout" className="account-action">Logout</span>
							</div>
						</div>
					</div>
				</div>

				<div id="main-container">
					<div id="navigation-bar">
						<button id="overview-tab" className="tab active"><i className="fa fa-eye" aria-hidden="true"/> Overview</button>
						<button id="vehicles-tab" className="tab"><i className="fa fa-car" aria-hidden="true"/> Vehicles</button>
						<button id="locations-tab" className="tab"><i className="fa fa-map-marker" aria-hidden="true"/> Locations</button>
						<button id="customers-tab" className="tab"><i className="fa fa-user" aria-hidden="true">/</i> Customers</button>
						<button id="employees-tab" className="tab"><i className="fa fa-id-card-o" aria-hidden="true"/> Employees</button>
						<button id="finances-tab" className="tab"><i className="fa fa-usd" aria-hidden="true"/> Finances</button>
						<button id="statistics-tab" className="tab"><i className="fa fa-line-chart" aria-hidden="true"/> Analytics</button>
						<button id="preferences-tab" className="tab"><i className="fa fa-cog" aria-hidden="true"/> Preferences</button>
						<button id="about-tab" className="tab"><i className="fa fa-question-circle" aria-hidden="true"/> About</button>
					</div>

					<div id="content">
						<OverviewTab/>
					</div>
				</div>
			</React.Fragment>
		)
	}
}