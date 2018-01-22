import React from 'react';
import Input from '../Input';

export default class SearchPanel extends React.Component {
	render() {
		return (
			<div id="search-panel">
				<div id="search-bar">
					<i className="fa fa-search" aria-hidden="true"/>
					<Input id="search-input" type="text"
						   placeholder="Enter a license plate, a customer name, a location, ..."/>
				</div>
			</div>
		)
	}
}