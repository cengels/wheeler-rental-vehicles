import React from 'react';
import WheelerLogo from './WheelerLogo';
import SearchPanel from './SearchPanel';
import UserPanel from './UserPanel';

export default function TopBar() {
	return (
		<div id="top-bar">
			<WheelerLogo />
			<SearchPanel />
			<UserPanel />
		</div>
	)
}