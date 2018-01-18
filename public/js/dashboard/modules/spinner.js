import $ from 'jquery';

export default {
	start: function() {
		const spinner = $('<div class="spinner">Loading...</div>');
		$('#content').append(spinner);
	},

	stop: function() {
		$('.spinner').remove();
	}
}