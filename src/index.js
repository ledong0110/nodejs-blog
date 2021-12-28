const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
app.use(morgan('combined'));

// Template handlebars
app.engine('hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
console.log(__dirname);

//Route
app.get('/trangchu', (req, res) => {
    res.render('home');
    // res.send('<h1 style="color:red;">Hello world</h1>')
});

app.get('/news', (req, res) => {
    res.render('news');
    // res.send('<h1 style="color:red;">Hello world</h1>')
});
app.listen(port, () => console.log(`Example app Listening at http://localhost:${port}`));