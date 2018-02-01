export default url => fetch(url)
	.then(response => {
		if (response.ok) {
			return response.json();
		} else {
			/* eslint-disable-next-line no-console */
			console.error(response);
		}
	})
	.catch(err => {
		/* eslint-disable-next-line no-console */
		console.error(err);
	});