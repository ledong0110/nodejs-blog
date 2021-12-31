const Course = require('../models/Course');
const { multipleMongooseToObject, ...rest } = require('../../util/mongoose');

class SiteController {
    //[GET] /news
    home(req, res, next) {
        // res.render('home');
        // Course.find({}, function(err, courses) {
        //     if (!err) res.json(courses);
        //     else res.status(400).json({error: 'ERROR!!!'});
        // })

        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }

    //[GET] /login
    login(req, res) {
        res.render('login');
    }
}

module.exports = new SiteController();
