import React from 'react';
import TabButton from './elements/tab-button';
import OverviewTab from './tabs/overview';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.setTabState = this.setTabState.bind(this);
		this.state = {
			currentTab: 'overview-tab'
		}
	}

	setTabState(newTabId) {
		this.setState({ currentTab: newTabId });
	}

	returnCurrentTab() {
		switch (this.state.currentTab) {
			case 'overview-tab':
				return <OverviewTab/>;
			case 'vehicles-tab':
				return '';
			case 'locations-tab':
				return '';
			case 'customers-tab':
				return '';
			case 'employees-tab':
				return '';
			case 'statistics-tab':
				return '';
			case 'preferences-tab':
				return '';
			case 'about-tab':
				return '';
			default:
				return '';
				// TODO: error page?
		}
	}

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
						<TabButton id="overview-tab" currentTab={this.state.currentTab} icon="fa-eye"
								   label="Overview" callback={this.setTabState}/>
						<TabButton id="vehicles-tab" currentTab={this.state.currentTab} icon="fa-car"
								   label="Vehicles" callback={this.setTabState}/>
						<TabButton id="customers-tab" currentTab={this.state.currentTab} icon="fa-user"
								   label="Customers" callback={this.setTabState}/>
						<TabButton id="employees-tab" currentTab={this.state.currentTab} icon="fa-id-card-o"
								   label="Employees" callback={this.setTabState}/>
						<TabButton id="finances-tab" currentTab={this.state.currentTab} icon="fa-usd"
								   label="Finances" callback={this.setTabState}/>
						<TabButton id="statistics-tab" currentTab={this.state.currentTab} icon="fa-line-chart"
								   label="Analytics" callback={this.setTabState}/>
						<TabButton id="preferences-tab" currentTab={this.state.currentTab} icon="fa-cog"
								   label="Preferences" callback={this.setTabState}/>
						<TabButton id="about-tab" currentTab={this.state.currentTab} icon="fa-question-circle"
								   label="About" callback={this.setTabState}/>
					</div>

					<div id="content">
						{this.returnCurrentTab()}
					</div>
				</div>
			</React.Fragment>
		)
	}
}