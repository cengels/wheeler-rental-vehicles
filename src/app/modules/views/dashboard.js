const renderPage = (viewName) => (req, res) => {
	res.render(viewName, { 'layout': false });
};

module.exports = (router, viewObject) => {
	router.get(viewObject.route, renderPage('dashboard'));
};