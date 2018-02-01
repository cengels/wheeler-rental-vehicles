import React from 'react';
import TabButton from './TabButton';

export default class NavigationBar extends React.Component {
	constructor(props) {
		super(props);
		this.setTabState = this.setTabState.bind(this);
		this.state = {
			currentTab: 'overview-tab'
		}
	}

	setTabState(newTabId) {
		this.setState({ currentTab: newTabId });
		this.props.callback(newTabId);
	}

	render() {
		return (
			<div id="navigation-bar">
				<TabButton id="overview-tab" currentTab={this.state.currentTab} icon="fa-eye"
						   label="Overview" callback={this.setTabState}/>
				<TabButton id="vehicles-tab" currentTab={this.state.currentTab} icon="fa-car"
						   label="Vehicles" callback={this.setTabState}/>
				<TabButton id="locations-tab" currentTab={this.state.currentTab} icon="fa-map-marker"
						   label="Locations" callback={this.setTabState}/>
				<TabButton id="customers-tab" currentTab={this.state.currentTab} icon="fa-user"
						   label="Customers" callback={this.setTabState}/>
				<TabButton id="employees-tab" currentTab={this.state.currentTab} icon="fa-id-card-o"
						   label="Employees" callback={this.setTabState}/>
				<TabButton id="finances-tab" currentTab={this.state.currentTab} icon="fa-usd"
						   label="Finances" callback={this.setTabState}/>
				<TabButton id="analytics-tab" currentTab={this.state.currentTab} icon="fa-line-chart"
						   label="Analytics" callback={this.setTabState}/>
				<TabButton id="preferences-tab" currentTab={this.state.currentTab} icon="fa-cog"
						   label="Preferences" callback={this.setTabState}/>
				<TabButton id="about-tab" currentTab={this.state.currentTab} icon="fa-question-circle"
						   label="About" callback={this.setTabState}/>
			</div>
		)
	}
}