import React from 'react';

export default function UserPanel() {
	return (
		<div id="user-panel">
			<img id="user-picture" alt="profile-picture" src="/public/images/blank-profile-picture.png"/>
			<div id="user-info">
				<div id="user-name">Anonymous User</div>
				<div id="user-options">
					<span id="action-settings" className="account-action">Settings</span>
					{" • "}
					<span id="action-logout" className="account-action">Logout</span>
				</div>
			</div>
		</div>
	)
}