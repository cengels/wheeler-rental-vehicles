import React from 'react';

export default function WelcomeSection({ text }) {
	return (
		<div id="welcome-section" className="super-section super">
			<div id="welcome-section-content" className="super-section-content">
				<div id="welcome-message">{text}</div>
			</div>
		</div>
	)
}