const morgan = require('morgan');
const newRouter = require('../routes/new');
const newSite = require('../routes/site');
const authRouter = require('./auth');
const homeController = require('../app/controllers/HomeController');

function route(app) {

  app.use(morgan('combined'));

  app.use('/auth', authRouter);
  app.use('/new', newRouter);
  app.use('/site', newSite);

  // Trang chủ
  app.get('/', homeController.index);
}

module.exports = route;