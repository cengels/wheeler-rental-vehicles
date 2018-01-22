import React from 'react';
import WheelerLogo from './top-bar/wheeler-logo';
import SearchPanel from './top-bar/search-panel';
import UserPanel from './top-bar/user-panel';

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