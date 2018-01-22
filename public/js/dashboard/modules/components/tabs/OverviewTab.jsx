import React from 'react';
import httpRequest from '../../http-request';

function returnDifference(firstNumber, secondNumber) {
	if (isNaN(firstNumber) || isNaN(secondNumber)) {
		return '?'
	} else {
		return firstNumber - secondNumber;
	}
}

export default class OverviewTab extends React.Component {
	constructor(props) {
		super(props);
		this.setNumbers = this.setNumbers.bind(this);

		this.state = {
			totalVehicles: '?',
			rentedVehicles: '?',
			totalCustomers: '?',
			oneTimeCustomers: '?'
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
				this.setState({
					totalVehicles: data[0].length,
					rentedVehicles: data[1].filter(rental => rental.milesdriven !== null).length,
					totalCustomers: data[2].length,
					oneTimeCustomers: [...new Set(data[1].map(item => item.customerid))].length
				});
			})
	}

	render() {
		return (
			<React.Fragment>
				<div id="welcome-section" className="super-section super">
					<div id="welcome-section-content" className="super-section-content">
						<div id="welcome-message">Welcome back, Anonymous!</div>
					</div>
				</div>

				<div id="vehicles-section" className="super-section">
					<div id="vehicles-heading" className="super-heading">Vehicles</div>

					<div id="vehicles-section-content" className="super-section-content">
						<div id="total-vehicles-section" className="content-section">
							<div id="total-vehicles-heading" className="section-heading">Total vehicles</div>
							<div id="total-vehicles-content" className="section-content">
								{this.state.totalVehicles}
							</div>
						</div>

						<div id="available-vehicles-section" className="content-section">
							<div id="available-vehicles-heading" className="section-heading">Available vehicles</div>
							<div id="available-vehicles-content" className="section-content">
								{returnDifference(this.state.totalVehicles, this.state.rentedVehicles)}
							</div>
						</div>

						<div id="rented-vehicles-section" className="content-section">
							<div id="rented-vehicles-heading" className="section-heading">Rented vehicles</div>
							<div id="rented-vehicles-content" className="section-content">
								{this.state.rentedVehicles}
							</div>
						</div>
					</div>
				</div>

				<div id="customers-section" className="super-section">
					<div id="customers-heading" className="super-heading">Customers</div>

					<div id="customers-section-content" className="super-section-content">
						<div id="total-customers-section" className="content-section">
							<div id="total-customers-heading" className="section-heading">Total customers</div>
							<div id="total-customers-content" className="section-content">
								{this.state.totalCustomers}
							</div>
						</div>

						<div id="repeat-customers-section" className="content-section">
							<div id="repeat-customers-heading" className="section-heading">Repeat customers</div>
							<div id="repeat-customers-content" className="section-content">
								{returnDifference(this.state.totalCustomers, this.state.oneTimeCustomers)}
							</div>
						</div>

						<div id="one-time-customers-section" className="content-section">
							<div id="one-time-customers-heading" className="section-heading">One-time customers</div>
							<div id="one-time-customers-content" className="section-content">
								{this.state.oneTimeCustomers}
							</div>
						</div>
					</div>
				</div>

				<div id="finances-section" className="super-section">
					<div id="finances-heading" className="super-heading">Finances</div>

					<div id="finances-section-content" className="super-section-content">
						<div id="gross-profit-section" className="content-section">
							<div id="gross-profit-heading" className="section-heading">Gross profit</div>
							<div id="gross-profit-content" className="section-content">?</div>
						</div>

						<div id="revenue-section" className="content-section">
							<div id="revenue-heading" className="section-heading">Revenue</div>
							<div id="revenue-content" className="section-content">?</div>
						</div>

						<div id="costs-section" className="content-section">
							<div id="costs-heading" className="section-heading">Expenses</div>
							<div id="costs-content" className="section-content">?</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}
}