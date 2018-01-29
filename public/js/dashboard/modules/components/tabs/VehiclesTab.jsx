import React from 'react';
import httpRequest from '../../http-request';
import Table from '../elements/Table';

function matchWithEquivalentValue(idToMatch, targetObjects, idKey, ...returnKeys) {
	const filteredRows = targetObjects.filter(obj => obj[idKey] === idToMatch);

	if (filteredRows.length > 0) {
		if (returnKeys.length === 1) {
			return filteredRows[0][returnKeys[0]];
		}

		return returnKeys.map(key => filteredRows[0][key]);
	}

	return '';
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
					'Currently Available',
					'Rented to Customer ID'
				]
			]
		};

		this.getVehicles();
	}

	getVehicles() {
		Promise.all([
			httpRequest('/vehicles'),
			httpRequest('/models'),
			httpRequest('/colors'),
			httpRequest('/rentals'),
			httpRequest('/customers')
		])
			.then(data => {
				const rows = data[0].map(vehicle => {
					vehicle.modelid = matchWithEquivalentValue(vehicle.modelid, data[1], 'modelid', 'name');
					vehicle.colorid = matchWithEquivalentValue(vehicle.colorid, data[2], 'colorid', 'name');
					vehicle.year = vehicle.year.toString();		// to prevent thousand separators

					const row = Object.values(vehicle);

					const rentedToId = matchWithEquivalentValue(vehicle.vehicleid, data[3], 'vehicleid', 'customerid');
					let rentedToCustomer = matchWithEquivalentValue(rentedToId, data[4], 'customerid', 'firstname',
						'lastname');

					if (rentedToCustomer.constructor === Array) {
						rentedToCustomer = rentedToCustomer.join(' ');
					}
					
					row.push(rentedToCustomer);

					return row;
				});

				this.setState({ data: this.state.data.concat(rows) })
			})
			.catch(err => console.error('HTTP request failed.', err));
	}

	render() {
		return (
			<React.Fragment>
				<Table data={this.state.data}/>
			</React.Fragment>
		)
	}
}