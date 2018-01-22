import $ from 'jquery';
import React from 'react';

export default class UnderConstructionTab extends React.Component {
	render() {
		return (
			<div id="welcome-section" className="super-section super">
				<div id="welcome-section-content" className="super-section-content">
					<div id="welcome-message">Oh no! This part of the dashboard is still under construction.</div>
				</div>
			</div>
		)
	}
}