module.exports = (router) => (route, view, options) => {
    if (typeof route !== 'string' || typeof view !== 'string') throw new Error('Error: route and view must be strings.');

    router.get(route, function (req, res) {
        console.log(options);

        res.render(view, options);
    });
};