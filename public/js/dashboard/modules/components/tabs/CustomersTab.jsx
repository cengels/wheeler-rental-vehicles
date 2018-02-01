import React from 'react';
import httpRequest from '../../http-request';
import Table from '../elements/Table';

export default class CustomersTab extends React.Component {
	constructor(props) {
		super(props);
		this.getVehicles = this.getVehicles.bind(this);

		this.state = {
			data: [
				[
					'C-ID',
					'Name',
					'Postal code',
					'Address',
					'City',
					'Phone number',
					'Customer since'
				]
			]
		};

		this.getVehicles();
	}

	getVehicles() {
		httpRequest('/customers')
			.then(data => {
				const columns = data.map(customer => {
					const column = Object.values(customer);

					column[1] = customer.firstname + ' ' + customer.lastname;
					column.splice(2, 1);

					return column;
				});

				this.setState({ data: this.state.data.concat(columns) }) });
	}

	render() {
		return (
			<React.Fragment>
				<Table data={this.state.data} />
			</React.Fragment>
		)
	}
}