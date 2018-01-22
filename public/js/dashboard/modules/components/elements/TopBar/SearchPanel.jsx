import React from 'react';

export default class SearchPanel extends React.Component {
	render() {
		return (
			<div id="search-panel">
				<div id="search-bar">
					<i className="fa fa-search" aria-hidden="true"/>
					<input id="search-input" name="search-input" type="text" value=""
						   placeholder="Enter a license plate, a customer name, a location, ..."/>
				</div>
			</div>
		)
	}
}