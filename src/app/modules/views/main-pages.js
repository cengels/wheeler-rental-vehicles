const renderPage = (viewName) => (req, res) => {
	res.render(viewName, { 'layout': false });
};

module.exports = {
	'aboutView': (router, viewObject) => {
		router.get(viewObject.route, renderPage('about-page'));
	},

	'contactView': (router, viewObject) => {
		router.get(viewObject.route, renderPage('contact-page'));
	},

	'featuresView': (router, viewObject) => {
		router.get(viewObject.route, renderPage('features-page'));
	},

	'frontPageView': (router, viewObject) => {
		router.get(viewObject.route, renderPage('front-page'));
	},

	'liteSignUpView': (router, viewObject) => {
		router.get(viewObject.route, renderPage('lite-sign-up-page'));
	},

	'regularSignUpView': (router, viewObject) => {
		router.get(viewObject.route, renderPage('regular-sign-up-page'));
	}
};