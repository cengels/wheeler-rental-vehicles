export default url => fetch(url)
	.then(response => {
		if (response.ok) {
			return response.json();
		}

		// eslint-disable-next-line no-console
		return console.error(response);
	})
	// eslint-disable-next-line no-console
	.catch(err => console.error(err));