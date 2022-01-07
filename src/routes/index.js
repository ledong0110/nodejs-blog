const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');
const { requiresAuth, claimEquals } = require('express-openid-connect');

function route(app) {
    // app.get('/', (req, res) => {
    //     res.render('home');
    //     // res.send('<h1 style="color:red;">Hello world</h1>')
    // });
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
    app.use('/courses', coursesRouter);
    app.use('/me', meRouter);
    app.get('*', function (req, res) {
        res.status = 404;
        res.render('notfound');
    });

    // app.get('/news', (req, res) => {
    //     res.render('news');
    //     // res.send('<h1 style="color:red;">Hello world</h1>')
    // });

    // app.get('/search', (req, res) => {
    //     console.log(req.query.q)
    //     res.render('search');
    // });

    // app.post('/search', (req, res) => {
    //     // console.log(req.query.q)
    //     res.send('error form');
    //     console.log(req.body)
    // });
}

module.exports = route;
