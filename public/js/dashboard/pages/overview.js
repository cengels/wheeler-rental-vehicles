Pages.Overview = {
	renderVehicleNumbers: (allVehicles, allRentals) => {
		const currentRentals = allRentals.filter(rental => rental.milesdriven !== null);

		$('#total-vehicles-content').html(allVehicles.length);
		$('#rented-vehicles-content').html(currentRentals.length);
		$('#available-vehicles-content').html(allVehicles.length - currentRentals.length);
	},

	renderCustomerNumbers: (allRentals, allCustomers) => {
		const oneTimeCustomerIds = [...new Set(allRentals.map(item => item.customerid))];

		$('#total-customers-content').html(allCustomers.length);
		$('#repeat-customers-content').html(allCustomers.length - oneTimeCustomerIds.length);
		$('#one-time-customers-content').html(oneTimeCustomerIds.length);
	},

	renderNumbers: () => {
		return $.when(
			$.get('/vehicles'),
			$.get('/rentals'),
			$.get('/customers')
		)
		.done((allVehicles, allRentals, allCustomers) => {
			Pages.Overview.renderVehicleNumbers(allVehicles[0], allRentals[0]);
			Pages.Overview.renderCustomerNumbers(allRentals[0], allCustomers[0]);
		});
	},

	render: () => {
		Pages.Overview.renderNumbers()
			.done(Pages.show);
	}
};