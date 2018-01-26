import React from 'react';
import httpRequest from '../../http-request';
import Table from '../elements/Table';

export default class VehiclesTab extends React.Component {
	constructor(props) {
		super(props);
		this.getVehicles = this.getVehicles.bind(this);

		this.state = {
			data: []
		};

		this.getVehicles();

		this.headers = [
			'V-ID',
			'Model',
			'Color',
			'License Plate',
			'Year',
			'Mileage',
			'Miles Since Maintenance',
			'Currently Available'
		];
	}

	getVehicles() {
		httpRequest('/vehicles')
			.then(data => { this.setState({ data: data }) })
	}

	render() {
		return (
			<React.Fragment>
				<Table headers={this.headers} data={this.state.data}/>
			</React.Fragment>
		)
	}
}