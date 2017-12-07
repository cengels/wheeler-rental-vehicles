const renderPage = (viewName) => (req, res) => {
	res.render(viewName, { layout: false });
};

module.exports = {
	frontPageView: (router, viewObject) => {
		router.get(viewObject.route, renderPage('front-page'));
	},

	featuresView: (router, viewObject) => {
		router.get(viewObject.route, renderPage('features-page'));
	}
};