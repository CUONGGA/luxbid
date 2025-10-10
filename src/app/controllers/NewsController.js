class NewsController {
    index(req, res) {
        res.render('new');
    }

    show(req, res) {
        res.send('DETAIL');
    }
}

module.exports = new NewsController();
