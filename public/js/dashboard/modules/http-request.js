export default url => fetch(url)
	.then(response => {
		if (response.ok) {
			return response.json();
		} else {
			console.error(response);
		}
	})
	.catch(err => {
		console.error(err);
	});