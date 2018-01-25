import React from 'react';
import httpRequest from '../../http-request';
import WelcomeSection from '../elements/WelcomeSection';
import PanelSection from '../elements/OverviewTab/SuperSection';

function extractRentedVehicles(totalVehicles) {
	return totalVehicles.filter(rental => rental.milesdriven !== null);
}

function extractOneTimeCustomers(totalCustomers) {
	return [...new Set(totalCustomers.map(item => item.customerid))];
}

export default class OverviewTab extends React.Component {
	constructor(props) {
		super(props);
		this.setNumbers = this.setNumbers.bind(this);

		this.state = {
			vehicleData: {
				totalVehicles: '?',
				availableVehicles: '?',
				rentedVehicles: '?'
			},
			customerData: {
				totalCustomers: '?',
				repeatCustomers: '?',
				oneTimeCustomers: '?'
			},
			financeData: {
				grossProfit: '?',
				revenue: '?',
				expenses: '?'
			}
		};

		this.setNumbers();
	}

	setNumbers() {
		Promise.all([
			httpRequest('/vehicles'),
			httpRequest('/rentals'),
			httpRequest('/customers')
		])
			.then(data => {
				const rentedVehicleLength = extractRentedVehicles(data[1]).length;
				const oneTimeCustomerLength = extractOneTimeCustomers(data[1]).length;

				this.setState({
					vehicleData: {
						totalVehicles: data[0].length,
						availableVehicles: data[0].length - rentedVehicleLength,
						rentedVehicles: rentedVehicleLength
					},
					customerData: {
						totalCustomers: data[2].length,
						repeatCustomers: data[2].length - oneTimeCustomerLength,
						oneTimeCustomers: oneTimeCustomerLength
					}
				});
			})
	}

	render() {
		return (
			<React.Fragment>
				<WelcomeSection text="Welcome back, Anonymous!"/>

				<PanelSection name="Vehicles" data={this.state.vehicleData}/>
				<PanelSection name="Customers" data={this.state.customerData}/>
				<PanelSection name="Finances" data={this.state.financeData}/>
			</React.Fragment>
		)
	}
}