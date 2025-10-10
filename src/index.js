const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const morgan = require('morgan');
const { create } = require('express-handlebars');
const sass = require('sass');
const route = require('./routes');

const hbs = create({
    extname: '.hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');
app.set('views', path.join(__dirname, './resource/views'));

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
