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

function formatRow(vehicle, data) {
	vehicle.modelid = matchWithEquivalentValue(vehicle.modelid, data[1], 'modelid', 'name');
	vehicle.colorid = matchWithEquivalentValue(vehicle.colorid, data[2], 'colorid', 'name');
	vehicle.year = vehicle.year.toString();		// to prevent thousand separators

	const row = Object.values(vehicle);

	const rentedRow = data[3].filter(rental => vehicle.vehicleid === rental.vehicleid && rental.milesdriven === null);

	if (rentedRow.length > 0) {
		const rentedToId = rentedRow[0].customerid;
		const customerName = matchWithEquivalentValue(rentedToId, data[4], 'customerid', 'firstname', 'lastname')
			.join(' ');

		row.push(customerName);
	} else {
		row.push('');
	}

	return row;
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
					'Rented to'
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
				const rows = data[0].map(vehicle => formatRow(vehicle, data));

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