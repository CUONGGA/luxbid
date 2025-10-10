class SiteController {
    index(req, res) {
        res.render('home');
    }

    show(req, res) {
        res.render('site');
    }
}

module.exports = new SiteController();
