import React from 'react';
import WheelerLogo from './TopBar/WheelerLogo';
import SearchPanel from './TopBar/SearchPanel';
import UserPanel from './TopBar/UserPanel';

export default class TopBar extends React.Component {
	render() {
		return (
			<div id="top-bar">
				<WheelerLogo/>
				<SearchPanel/>
				<UserPanel/>
			</div>
		)
	}
}