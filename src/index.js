const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

//Static file
app.use(express.static(path.join(__dirname, 'public')));

//body parser for POST method
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

//HTTP logger
// app.use(morgan('combined'));

// Template handlebars
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
console.log(__dirname);

// Home, search, contact

//Routes init

route(app);

app.listen(process.env.PORT || port, () =>
    console.log(`App Listening at http://localhost:${port}`),
);
