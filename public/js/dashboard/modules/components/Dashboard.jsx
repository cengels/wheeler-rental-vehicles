import React from 'react';
import OverviewTab from './tabs/OverviewTab';
import UnderConstructionTab from './tabs/UnderConstructionTab';
import ErrorTab from './tabs/ErrorTab';
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
				return <UnderConstructionTab/>;
			case 'locations-tab':
				return <UnderConstructionTab/>;
			case 'customers-tab':
				return <UnderConstructionTab/>;
			case 'employees-tab':
				return <UnderConstructionTab/>;
			case 'statistics-tab':
				return <UnderConstructionTab/>;
			case 'preferences-tab':
				return <UnderConstructionTab/>;
			case 'about-tab':
				return <UnderConstructionTab/>;
			default:
				return <ErrorTab/>;
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