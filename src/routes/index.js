const path = require('path');
const express = require('express');
const morgan = require('morgan');
const newRouter = require('../routes/new');
const newSite = require('../routes/site');
function route(app) {
    app.use(morgan('combined'));
    app.use(express.static(path.join(__dirname, './public')));
    app.use('/new', newRouter);
    app.use('/site', newSite);
}

module.exports = route;
