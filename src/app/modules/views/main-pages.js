const renderPage = (viewName) => (req, res) => {
	res.render(viewName, { layout: false });
};

module.exports = {
	frontPageView: (router, viewObject) => {
		router.get(viewObject.route, renderPage('front-page'));
	},

	featuresView: (router, viewObject) => {
		router.get(viewObject.route, renderPage('features-page'));
	},

	liteSignUpView: (router, viewObject) => {
		router.get(viewObject.route, renderPage('lite-sign-up-page'));
	},

	regularSignUpView: (router, viewObject) => {
		router.get(viewObject.route, renderPage('regular-sign-up-page'));
	},

	aboutView: (router, viewObject) => {
		router.get(viewObject.route, renderPage('about-page'));
	},

	contactView: (router, viewObject) => {
		router.get(viewObject.route, renderPage('contact-page'));
	}
};