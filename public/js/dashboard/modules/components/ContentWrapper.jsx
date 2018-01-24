import React from 'react';
import OverviewTab from './tabs/OverviewTab';
import UnderConstructionTab from './tabs/UnderConstructionTab';
import ErrorTab from './tabs/ErrorTab';

export default class ContentWrapper extends React.Component {
	returnCurrentTabContent() {
		switch (this.props.tab) {
			case 'overview-tab':
				return <OverviewTab/>;
			case 'vehicles-tab':
			case 'locations-tab':
			case 'customers-tab':
			case 'employees-tab':
			case 'finances-tab':
			case 'analytics-tab':
			case 'preferences-tab':
			case 'about-tab':
				return <UnderConstructionTab/>;
			default:
				return <ErrorTab/>;
		}
	}

	render() {
		return (
			<div id="content-wrapper" className={this.props.hidden === true ? "hidden" : undefined}>
				{this.returnCurrentTabContent()}
			</div>
		)
	}
}