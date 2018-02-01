import React from 'react';
import WheelerLogo from './TopBar/WheelerLogo';
import SearchPanel from './TopBar/SearchPanel';
import UserPanel from './TopBar/UserPanel';

export default function TopBar() {
	return (
		<div id="top-bar">
			<WheelerLogo/>
			<SearchPanel/>
			<UserPanel/>
		</div>
	)
}