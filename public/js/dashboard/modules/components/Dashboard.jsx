import React from 'react';
import TopBar from './elements/TopBar';
import NavigationBar from './elements/NavigationBar';
import ContentWrapper from './ContentWrapper';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.setTabState = this.setTabState.bind(this);
		this.state = {
			currentTab: 'overview-tab',
			hidden: 'false'
		}
	}

	setTabState(newTabId) {
		this.setState({ hidden: true });
		setTimeout(() => this.setState({ currentTab: newTabId, hidden: false }), 200);
	}

	render() {
		return (
			<React.Fragment>
				<TopBar/>

				<div id="main-container">
					<NavigationBar callback={this.setTabState}/>

					<div id="content-container">
						<ContentWrapper tab={this.state.currentTab} hidden={this.state.hidden}/>
					</div>
				</div>
			</React.Fragment>
		)
	}
}