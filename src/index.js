const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const app = express();

const { auth } = require('express-openid-connect');

const port = process.env.PORT || 3000;

const route = require('./routes');
const db = require('./config/db');

//Connect auth0
const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'https://dong-blog-web.herokuapp.com',
    clientID: 'yfaaZnedjIAkRN3Pnj8yccdsw6dLDUuq',
    issuerBaseURL: 'https://dev-4kc217q2.us.auth0.com',
    secret: '-5YfLejfmuK2TuaaOdElTUn5z6GmKrWrjRBcM5BqP51wKTTWtQBBgmRHtkus1axK',
    routes: {
        login: false,
        postLogoutRedirect: '/logout_setting',
    },
    attemptSilentLogin: true,
    authorizationParams: {
        connection: 'google-oauth2',
    },
};

app.use(auth(config));

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

app.locals.authenticatted = false;
app.locals.users = null;
console.log(__dirname);

app.get('/login_setting', function (req, res) {
    app.locals.users = {
        name: req.oidc.user.name,
        picture: req.oidc.user.picture,
    };
    app.locals.authenticated = true;
    console.log(req.oidc.user.profile);
    res.redirect('/');
});
app.get('/logout_setting', function (req, res) {
    app.locals.users = null;
    app.locals.authenticated = false;

    res.redirect('/');
});
// Home, search, contact

//Routes init

route(app);

app.listen(port, () =>
    console.log(`App Listening at http://localhost:${port}`),
);
