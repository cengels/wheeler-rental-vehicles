import React from 'react';
import OverviewTab from './tabs/OverviewTab';
import TopBar from './elements/TopBar';
import NavigationBar from './elements/NavigationBar';

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
				<TopBar/>

				<div id="main-container">
					<NavigationBar callback={this.setTabState}/>

					<div id="content">
						{this.returnCurrentTab()}
					</div>
				</div>
			</React.Fragment>
		)
	}
}