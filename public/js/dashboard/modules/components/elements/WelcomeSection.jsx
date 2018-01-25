import React from 'react';

export default class WelcomeSection extends React.Component {
	render() {
		return (
			<div id="welcome-section" className="super-section super">
				<div id="welcome-section-content" className="super-section-content">
					<div id="welcome-message">{this.props.text}</div>
				</div>
			</div>
		)
	}
}