import $ from 'jquery';
import React from 'react';

export default class ErrorTab extends React.Component {
	render() {
		return (
			<div id="welcome-section" className="super-section super">
				<div id="welcome-section-content" className="super-section-content">
					<div id="welcome-message">Oh no! Something went wrong. Please try again.</div>
				</div>
			</div>
		)
	}
}