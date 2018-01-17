Pages.Overview = {
	renderVehicleNumbers: () => {
		return $.when(
			$.get('/vehicles'),
			$.get('/rentals')
		)
		.done((allVehicles, allRentals) => {
			const currentRentals = allRentals[0].filter(rental => rental.milesdriven !== null);

			$('#total-vehicles-content').html(allVehicles[0].length);
			$('#rented-vehicles-content').html(currentRentals.length);
			$('#available-vehicles-content').html(allVehicles[0].length - currentRentals.length);
		});
	},

	renderCustomerNumbers: (allRentals) => {
		$.get('/customers')
		.done(allCustomers => {
			console.log(allRentals);
			console.log(allCustomers);

			const oneTimeCustomerIds = [...new Set(allRentals.map(item => item.customerid))];

			$('#total-customers-content').html(allCustomers.length);
			$('#repeat-customers-content').html(allCustomers.length - oneTimeCustomerIds.length);
			$('#one-time-customers-content').html(oneTimeCustomerIds.length);
		});
	},

	show: () => {
		Pages.Overview.renderVehicleNumbers()
			.done((allVehicles, allRentals) => Pages.Overview.renderCustomerNumbers(allRentals[0]));
	}
};