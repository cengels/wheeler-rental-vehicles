import $ from 'jquery';

function renderVehicleNumbers(allVehicles, allRentals) {
	const currentRentals = allRentals.filter(rental => rental.milesdriven !== null);

	$('#total-vehicles-content').html(allVehicles.length);
	$('#rented-vehicles-content').html(currentRentals.length);
	$('#available-vehicles-content').html(allVehicles.length - currentRentals.length);
}

function renderCustomerNumbers(allRentals, allCustomers) {
	const oneTimeCustomerIds = [...new Set(allRentals.map(item => item.customerid))];

	$('#total-customers-content').html(allCustomers.length);
	$('#repeat-customers-content').html(allCustomers.length - oneTimeCustomerIds.length);
	$('#one-time-customers-content').html(oneTimeCustomerIds.length);
}

function renderNumbers() {
	return $.when(
		$.get('/vehicles'),
		$.get('/rentals'),
		$.get('/customers')
	)
	.done((allVehicles, allRentals, allCustomers) => {
		renderVehicleNumbers(allVehicles[0], allRentals[0]);
		renderCustomerNumbers(allRentals[0], allCustomers[0]);
	});
}

export default {
	render: function() {
		return renderNumbers()
			.done(() => $('.super-section').css('opacity', 1))
	}
}