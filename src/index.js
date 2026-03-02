require('dotenv').config();
console.log('MONGO_URI =', process.env.MONGO_URI);
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const handlebarsHelpers = require('./util/handlebars');
const route = require('./routes');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');
const productRouter = require('./routes/product');
const auctionRouter = require('./routes/auction');
const authMiddleware = require('./app/middlewares/AuthMiddleware');
const sortMiddleware = require('./app/middlewares/SortMiddleware');
const db = require('./config/db');
const PORT = process.env.PORT || 3000;

db.connect();


require('./config/passport');
require('./strategy/facebook_strategy');
require('./strategy/local_strategy');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;

  res.locals.successLogin = req.session.successLogin;
  res.locals.successRegister = req.session.successRegister;
  res.locals.bidSuccess = req.session.bidSuccess;

  delete req.session.successLogin;
  delete req.session.successRegister;
  delete req.session.bidSuccess;
  next();
});

app.use(sortMiddleware);

app.use(morgan('combined'));

app.use(methodOverride('_method'));

app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    ...handlebarsHelpers,
    formatCurrency: function (value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

app.use('/products', productRouter);
app.use('/auction', auctionRouter);
route(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error('🔥 ERROR:', err.stack);
  res.status(500).send(`<pre>${err.stack}</pre>`);
});