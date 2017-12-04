module.exports = (router, viewObject) => {
	router.get(viewObject.route, (req, res) => {
		res.render('front-page', { layout: false });
	});
};