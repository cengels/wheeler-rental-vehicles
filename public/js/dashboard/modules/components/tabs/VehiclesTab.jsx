import React from 'react';
import httpRequest from '../../http-request';
import Table from '../elements/Table';

function getNameFromId(sourceObject, targetObjects, key) {
	return targetObjects.filter(obj => obj[key] === sourceObject[key])[0].name;
}

export default class VehiclesTab extends React.Component {
	constructor(props) {
		super(props);
		this.getVehicles = this.getVehicles.bind(this);

		this.state = {
			data: [
				[
					'V-ID',
					'Model',
					'Color',
					'License Plate',
					'Year',
					'Mileage',
					'Miles Since Maintenance',
					'Currently Available'
				]
			]
		};

		this.getVehicles();
	}

	getVehicles() {
		Promise.all([
			httpRequest('/vehicles'),
			httpRequest('/models'),
			httpRequest('/colors')
		])
			.then(data => {
				const columns = data[0].map(vehicle => {
					vehicle.modelid = getNameFromId(vehicle, data[1], 'modelid');
					vehicle.colorid = getNameFromId(vehicle, data[2], 'colorid');

					return Object.values(vehicle);
				});

				this.setState({ data: this.state.data.concat(columns) })
			})
	}

	render() {
		return (
			<React.Fragment>
				<Table data={this.state.data}/>
			</React.Fragment>
		)
	}
}